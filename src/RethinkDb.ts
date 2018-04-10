import * as RethinkDash from 'rethinkdbdash';
import * as WebSocket from 'ws';

import { Report } from './models/reports';

const DB_NAME = 'wilde_liga_bremen';

export class RethinkDb {
    private tableList: string[] = ['chats', 'reports'];

    r: RethinkDash;
    rethinkConnection: any;

    constructor() {
        this.r = new RethinkDash({
            servers: [
                {host: 'localhost', port: 28015},
            ],
            db: DB_NAME
        });
        this.initDatabase();
        this.initTables();
        this.r.table('chats').changes().run(
            (result) => {
                //console.log(result);
                if(result) {
                    result.changes.forEach(
                        (change) => {
                            console.log(change);
                        }
                    );
                }
            }
        )
    }

    initDatabase() {
        this.r.dbList().contains(DB_NAME)
            .do((dbExist) => {
                return this.r.branch(
                    dbExist,
                    {dbs_created: 0},
                    this.r.dbCreate(DB_NAME)
                );
            }).run();
    }

    initTables() {
        this.r(this.tableList)
            .difference(this.r.tableList())
            .forEach((table) => this.r.tableCreate(table))
            .run();
        //this.r.db('wilde_liga_bremen').tableCreate('chats').run();
    }

    saveChatMessage(message: string, userName: string) {

        this.r.table('chats')
            .insert({message: message, userName: userName},
                    {returnChanges: true})
            .run()
            .then(
                (result) => {
                    console.log(result);
                }
            )
    }

    sendReport(matchId: string, ws: WebSocket): void {
        console.log(matchId);
        this.r.table('reports').filter({id: matchId}).run()
        .then(
            (result) => {
                console.log(result);
                ws.send( JSON.stringify({type: 'reportSent', data: result[0]}));
            }
        )
    }

    saveReport(data) {
        console.log(data.content);
        this.r.table('reports').insert({
            id: data.matchId,
            content: data.content
        },{ conflict: 'replace'} ).run().then(
            (result) => {
                console.log(result);
            }
        );
    }
}