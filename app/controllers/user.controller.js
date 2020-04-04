exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.AgenceBoard = (req, res) => {
  res.status(200).send("Agence Content.");
};

exports.EmployeBoard = (req, res) => {
  res.status(200).send("Employe Content.");
};
