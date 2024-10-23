import React from 'react'

export default function Card(props) {

  let options=props.food.options[0];
  let priceOption=Object.keys(options)

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem","maxHeight":"360px" }}>
          <img src={props.food.img} className='card-img-top' alt='...' />
          <div className="card-body">
            <h5 className="card-title">{props.food.name}</h5>
            {/* <p className="card-text">
            {props.food.description}
            </p> */}
            <div className="container ">
                <select className="m-2 h-100 bg-success rounded">
                    {Array.from(Array(3),(e,i)=>{
                        return(
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    })}
                </select>
                <select className="m-2 h-100  bg-success rounded">
                  {priceOption.map((quantity)=>{
                    return(
                      <option key={quantity} value={quantity}>{quantity}</option>
                    )
                  })}
                </select>

                <div className="d-inline h-100 fs-5"> Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
