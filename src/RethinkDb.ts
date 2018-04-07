import * as RethinkDash from 'rethinkdbdash';

const DB_NAME = 'wilde_liga_bremen';

export class RethinkDb {
    private tableList: string[] = ['chats'];

    r: RethinkDash;
    rethinkConnection: any;

    constructor() {
        this.r = new RethinkDash({
            servers: [
                {host: 'localhost', port: 28015}
            ]
        });
        this.initDatabase();
        this.initTables();
        this.r.table('chats').run().then(
            (result) => {
                console.log(result);
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
}