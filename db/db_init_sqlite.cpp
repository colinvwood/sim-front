#include <stdio.h>
#include <stdlib.h>
#include <sqlite3.h>


int main() {

    sqlite3 *db;
    int status;

    status = sqlite3_open("simulation.sqlite.db", &db);
    if (status) {
        printf("error creating database\n");
        exit(-1);
    }
    
    char *error;
    
    char tables_sql[] = 
        "CREATE TABLE run("
            "run_id INTEGER PRIMARY KEY NOT NULL, "
            "name TEXT, "
            "date TEXT, "
            "parameters_id INTEGER, "
            "FOREIGN KEY (parameters_id) REFERENCES parameters (parameters_id)"
        ");"
        
        "CREATE TABLE repetition("
            "repetition INTEGER, "
            "run_id INTEGER, "
            "stats_id INTEGER, "
            "FOREIGN KEY (run_id) REFERENCES run (run_id), "
            "FOREIGN KEY (stats_id) REFERENCES stats (stats_id), "
            "PRIMARY KEY (repetition, run_id)"
        ");"

        "CREATE TABLE parameters("
            "parameters_id INTEGER PRIMARY KEY AUTOINCREMENT, "
            "source_generations INTEGER, "
            "recipient_generations INTEGER, "
            "carrying_capacity INTEGER, "
            "mutation_rate REAL, "
            "genome_size INTEGER, " 
            "bottleneck INTEGER"
        ");"

        "CREATE TABLE stats("
            "stats_id INTEGER PRIMARY KEY AUTOINCREMENT, "
            "stats TEXT NOT NULL" // json
        ");"

   ; 

    status = sqlite3_exec(db, tables_sql, NULL, 0, &error);
    if (status) {
        printf("error creating table\n");
        printf("%s\n", error);
        exit(-1);
    }

}
