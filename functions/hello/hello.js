// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const mongoose = require('mongoose');

let connection = null;

dataConnection = async () => {
  console.log("connection exists = ", connection !== null);
  if (!connection) {
    try {

      mongoose.connect("mongodb+srv://WajahatAZ:Abihawajahat1!@jamstackcrudmongodb.2qgx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true, useUnifiedTopology: true,
        bufferCommands: false, bufferMaxEntries: 0
      });

      connection = mongoose.connection;
      await connection;
      console.log('mongoose open for business');

      //schema
      const studentSchema = new mongoose.Schema({
        name: String,
        age: Number
      });

      //model
      mongoose.models.Students || mongoose.model("Student", studentSchema);

    } catch (error) {
      console.log("Error in connection to database", error);
    }

  }
  return connection;
}

const handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  //uper wala function call krrhe hain 
  await dataConnection();

  try {
    const Student = mongoose.models.Student;
    const result = await Student.findById({ _id: "60a73a83ecf7a92ed12ce850" });
    console.log("Result : ", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
