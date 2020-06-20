class Reader{
  constructor(inputStream){
    this.inputStream = inputStream;
  }

  setDefault(defaultValue){
    this.defaultValue = defaultValue;
  }

  setReaders(readers){
    this.readers = readers;
  }

  async read(){
    const objs = []

    for(const reader of this.readers){
      const obj = await reader.read();
      objs.push(obj);
    }

    return objs;
  }
}

module.exports = Reader;