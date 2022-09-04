import * as AWS from 'aws-sdk'

const configuration = {
    region: 'us-west-2',
    secretAccessKey: 'K48Nsn+HNwTIjO1+t8LRlpZps0oHmNZlIPxNAdYv',
    accessKeyId: 'AKIAU4QKZUFBILW3MD6J'
}

AWS.config.update(configuration)

const ddb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchData = async (tableName) => {
    var params = {
        TableName: tableName
    }
    const items = await docClient.scan(params).promise();
    return items.Items;
}

export const getImage = async (imageName) => {
    var params = {
        Bucket: "plants-carrigan",
        Key: `images/${imageName}`
    };
    return new AWS.S3().getObject(params).promise();
}

export const addData = async (name, date, image) => {
    const item = image ?
    {
        'name': {S: name},
        'id': {N: (Date.now() + Math.random()).toString()},
        'date': {S: date ? date.toString() : "Unknown"},
        'image': {S: image.name}
    } :
    {
        'name': {S: name},
        'id': {N: (Date.now() + Math.random()).toString()},
        'date': {S: date ? date.toString() : "Unknown"},
    };
    
    var params = {
        TableName: "plants",
        Item: item
    }

    if(image){
        uploadImage(image).promise().catch((err) => {
            console.log(err)
            return Promise.reject();
        })
    }
    return ddb.putItem(params).promise();
  }

export const editData = async (id, data) => {
    console.log("edit")
}

export const deleteData = async (id) => {
    var params = {
        TableName: "plants",
        Key: {
          'id': {N: id.toString()}
        }
      };
      
      // Call DynamoDB to delete the item from the table
      return ddb.deleteItem(params).promise();
}

export const uploadImage = async (file) => {
    var upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'plants-carrigan',
          Key: `images/${file.name}`,
          Body: file
        }
      });

    return upload.promise();
}
