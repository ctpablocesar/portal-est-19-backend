const isType = ( value ) => {

    if( !value ){
        return false;
    }

    if ( value === 'admin' ) {
        return true;
    }else if ( value === 'user' ) {
        return true;
    }

    return false;

}

module.exports = { isType };