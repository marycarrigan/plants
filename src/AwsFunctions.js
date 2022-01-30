import * as AWS from 'aws-sdk'


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

export const addData = async (tableName, name, date, imageName) => {
    var params = {
        TableName: tableName,
        Item: {
            'name': {S: name},
            'id': {N: (Date.now() + Math.random()).toString()},
            'date': {S: date ? date.toString() : "Unknown"},
            'image': {S: imageName}
        }
    }
    return ddb.putItem(params).promise();
  }

export const deleteData = async (tableName, id) => {
    var params = {
        TableName: tableName,
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
