const fs = require("fs");
const { resolve } = require("path");

const writeDataToFile = (filename, content) => {

    fs.writeFileSync(filename, JSON.stringify(content), "utf8", err => {
        if (err) {
            console.log(err);
        };
    });
};

const getPostData = req => {

    return new Promise((req, res) => {

        try {

            let data = "";

            req.on("data", chunck => {
                data += chunck.toString();
            });

            req.on("end", () => {
                resolve(data);
            });

        } catch (error) {
            console.log(error);
        };
    });
};

module.exports = {
    writeDataToFile,
    getPostData,
};