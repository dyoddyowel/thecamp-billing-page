const Email = require('email-templates');

const email = new Email({
  message: {
    from: 'sam@onepercentnutrition.com'
  },
  send: true,
  transport: {
    jsonTransport: true
  }
});

const sendEmail = (email, name) => {
  email
    .send({
      template: 'mindbody',
      message: {
        to: email
      },
      attachments: [{
        path: '/emails/files/ToughLove_ValentinesNutritionTrainingProgram.pdf'
      }],
      locals: {
        name: name
      }
    })
    .then(console.log)
    .catch(console.error);
}
