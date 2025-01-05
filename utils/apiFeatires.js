class APIFeateres {

    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){

        const queryobj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryobj[el]);

        //1B) Advanced filtering
        let qeurStr = JSON.stringify(queryobj);
        qeurStr = qeurStr.replace(/\b(gte|gt|lte)\b/g, match => `$ ${match}`);

        this.query = this.query.find(JSON.parse(qeurStr))

        return this;
    }
    sort(){

        if (this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    limitFields(){
        
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        }else {
           this.query = this.query.select('-__v')
        }

        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeateres;