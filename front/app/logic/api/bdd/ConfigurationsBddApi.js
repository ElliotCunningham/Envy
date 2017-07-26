import PouchDbApi from '../../base/PouchDbApi';

class ConfigurationsBddApi extends PouchDbApi {
  constructor() {
    super('configurations');
  }

  initConfigurationsBddApi(callBack) {
    this._startChangeListenner(callBack);
  }

  getDocumentById(id) {
    return this.getDocById(id);
  }

  createDocument(doc) {
    return this.createDoc(doc);
  }

  updateDocument(doc) {
    return this.updateDoc(doc);
  }

  deleteDocument(doc) {
    return this.removeDoc(doc);
  }

  createDocumentWithoutId(doc) {
    return this.createDocWithoutId
  }

  bulkInsertDocuments(docs) {
    return this.bulkInsertDoc(docs);
  }

  bulkDeleteDocuments(docs) {
    return this.bulkDeleteDoc(docs);
  }

  fetchAllDocuments(option = false) {
    return this.fetchAllDocs(option);
  }

  destryBdd() {
    return this.destroyDataBase();
  }

}

export default new ConfigurationsBddApi();