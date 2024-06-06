const fs = require('fs');
const path = require('path');

const fileName =  'ocorrencias.json'
const filePath = path.join(__dirname,'..','database', fileName);

class OccurrenceRepository {

    static async writeCBMFile(occurrences) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(occurrences, null, 2), (err) => {
                if (err) return reject(err);
                console.log("data written to file: ${filePath}");
                resolve(this.listAllOccurrences());
            });
        });
    }

    static async listAllOccurrences() {
        const occurrences = await this.getOccurrences();
        return occurrences;
    }

    static async getOccurrences() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === "ENOENT"){
                        this.writeCBMFile([]);
                        return [];
                    } else{
                        reject(err);
                    }
                } else{
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static async createOccurrence(occurrence) {
        const occurrences = await this.getOccurrences();
        occurrence.id = await this.getNextId();
    
        occurrences.push(occurrence);
        const insertDB = await this.writeCBMFile(occurrences);
    
        return insertDB;
      }
      static async getNextId() {
        const occurrences = await this.getOccurrences();
        let maxId = 0;
        occurrences.forEach((occ) => {
          if (occ.id > maxId) {
            maxId = occ.id;
          }
        });
        return maxId + 1;
      }
static async getOccurrenceById(id) {
        const occurrences = await this.getOccurrences();
        return occurrences.find(occurrence => occurrence.id === parseInt(id));
    }

    static async updateOccurrence(id, updatedOccurrence) {
        const occurrences = await this.getOccurrences();
        const index = occurrences.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return null;
        }
        occurrences[index] = { ...occurrences[index], ...updatedOccurrence };
        const updateDB = await this.writeCBMFile(occurrences);
        return updateDB;
    }

    static async deleteOccurrence(id) {
        const occurrences = await this.getOccurrences();
        const index = occurrences.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return null;
        }
        occurrences.splice(index, 1);
        await this.writeCBMFile(occurrences);
        return index;
    }
}

module.exports = OccurrenceRepository;