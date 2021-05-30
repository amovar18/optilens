import React from 'react';
import {Link} from 'react-router-dom';
function single_product_list(props){
    const {data}=props;
    if(data.length>0){
        return(
            <div>
                {data.map(({_id,productname,price,image,shop,brand})=>(
                    <Link to={"/productdisplay/"+_id} key={_id} style={{'textDecoration':'none'}}>
                        <div className='col align-items-start' key={_id}>
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img className="img-thumbnail" src={image[0]} alt={productname}/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-start display-6" style={{'textDecoration':'none'}}>{productname}</h5>
                                            <p className="card-text text-start fs-5">Sold by: {shop[0]['shopname']}</p>
                                            <p className="card-text text-start fs-6">Brand: {brand}</p>
                                            <p className="card-text text-start fs-6">Price: {price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </Link>
            ))};
            </div>
        );
    }else{
        return(<h3>Error fetching data from server</h3>);
    }
}
export default single_product_list;