const xlsx = require('xlsx');

function parseExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData.map(row => ({
    prn: String(row.PRN),
    name: row.Name,
    email: row.Email,
    branch: row.Branch
  }));
}

module.exports = { parseExcel };
