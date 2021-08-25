const Message = require("../Models/Message");
const Emaillist = require("../Models/Emaillist");
const nodemailer = require("nodemailer");

const emailSender = async (name, email, brandName, message) => {
  //   console.log(email, subject, description);
  if ((email, message)) {
    const output = `
      <p>Client Name ${name}</p>
      <p>Client Email ${email}</p>
      <p>Brand Name ${brandName}</p>
      
              <p>${message}</p>
              `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.google.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      service: "gmail",
      auth: {
        user: "queryaidataron@gmail.com", // generated ethereal user
        pass: "nwnxovucjfoqqwww", // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"AidataRon Query" <queryaidataron@gmail.com>', // sender address
      to: "aidataronofficial@gmail.com", // list of receivers
      subject: "Client Query", // Subject line
      // text: details, // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      return true;
    });
  } else {
    // res.json({ message: "Something went Wrong", message: false });
    return false;
  }
};

const addMessage = async (req, res) => {
  let { name, email, brandName, message } = req.body;

  if (email && message) {
    console.log(req.body);

    let sendEmail = emailSender(name, email, brandName, message);

    const createdMessage = new Message({
      name,
      email,
      brandName,
      message,
    });

    try {
      createdMessage.save();
      res.json({
        success: true,
        message: "Message Have been received. Team would contact you soon",
      });

      try {
        let existingUser = await Emaillist.findOne({ email: email });

        if (existingUser) {
          console.log("user already exist");
          return;
        } else {
          const createdClient = new Emaillist({
            name,
            email,
            brandName,
          });

          try {
            createdClient.save();
            console.log("Client Got saved");
          } catch (Err) {
            console.log("Error in saving client", Err);
          }
        }
      } catch (err) {
        console.log("Adding client in list failed");
        return;
      }
      return;
    } catch (err) {
      res.json({
        message: "Message Sending Failed Try Again Later",
        success: false,
      });
      return;
    }
  } else {
    res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }
};

module.exports = {
  addMessage,
};
