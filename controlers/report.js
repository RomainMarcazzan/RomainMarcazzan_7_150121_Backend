const { Report, User, Post } = require("../models");

exports.createReport = (req, res, next) => {
  const reportObject = req.body;
  Report.findOne({
    where: { userId: reportObject.userId, postId: reportObject.postId },
  })
    .then((reportFound) => {
      if (reportFound) {
        Report.destroy({ where: { id: reportFound.id } })
          .then(res.status(201).json({ isReported: false }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        const report = new Report({ ...reportObject });
        report
          .save()
          .then(res.status(201).json({ isReported: true }))
          .catch((error) => res.status(500).json(error));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneReport = (req, res, next) => {
  Report.findAll({
    where: { postId: req.params.id },
  })
    .then((report) => res.status(200).json(report))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllReports = (req, res, next) => {
  Report.findAll({ include: [{ model: User }, { model: Post }] })
    .then((reports) => res.status(200).json(reports))
    .catch((error) => res.status(400).json({ error }));
};

exports.removeReport = (req, res, next) => {
  const reportId = req.params.id;
  Report.destroy({ where: { id: reportId } })
    .then(res.status(200).json({ message: "report supprimé" }))
    .catch(res.status(400).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.removeProfile = (req, res, next) => {
  const profileId = req.params.id;
  User.destroy({ where: { id: profileId } })
    .then(res.status(200).json({ message: "compte supprimé" }))
    .catch(res.status(400).json({ error }));
};
