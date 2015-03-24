var pdf = require('phantomjs-pdf');

pdf.convert({
        "html": "dist/resume.html",
        "css": "dist/resume.css",
        "paperSize": {format: "A4", border: "0cm"}
    },
    function (result) {
        result.toFile("dist/resume.pdf", function () {
        });
    });