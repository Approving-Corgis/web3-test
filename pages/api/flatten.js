import truffleFlattener from "truffle-flattener";
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'contracts');
  //Read the json data file data.json
  const test = await truffleFlattener([jsonDirectory + '/Test.sol']);
  console.log(test);
  // const fileContents = await fs.readFile(jsonDirectory + '/Test.sol', 'utf8');
}
