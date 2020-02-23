const mongoose = require('mongoose');
const schema = mongoose.Schema; //Schema -to właściwość, to nazwa stała, schema to nasza nazwa nadana

let articleSchema =new schema({
        title: {
            type: String
        },
        author: {
            type: String
        },
        content: {
            type: String
        }
    },{
    collection: 'articles' //nazwa kolekcji
        }
)
module.exports= mongoose.model('Article', articleSchema)