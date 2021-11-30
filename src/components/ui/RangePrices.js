import React, { useContext, useState } from 'react'
import {Range , getTrackBackground} from 'react-range'
import ProductContext from '../../context/product/ProductContext';
import { getProductsForRange } from '../../helpers/functions';

export const RangePrices = ({prices}) => {

    const {getProductsForRange} = useContext(ProductContext);

    const STEP = 1;
    const MIN = prices.lowerPrice;
    const MAX = 10000;
    const [values, setValues] = useState([prices.lowerPrice, MAX]);

    return (
        <div className = "mt-5">
            <h3 className = "text-lg font-bold">Precios</h3>
            <h2 className = "text-center">Precio Minimo</h2>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={values => {
                    setValues(values);
                    
                }}
                renderTrack={({ props, children }) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    onMouseUp = {() => {
                        getProductsForRange(values[0], values[1])
                    }}
                    style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%"
                    }}
                >
                    <div
                    ref={props.ref}
                    style={{
                        height: "3px",
                        width: "100%",
                        borderRadius: "50px",
                        background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#8b5cf6", "#ccc"],
                        min: MIN,
                        max: MAX
                        }),
                        alignSelf: "center"
                    }}
                    >
                    {children}
                    </div>
                </div>
                )}
                renderThumb={({ props, isDragged }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "100%",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA"
                    }}
                >
                    <div
                    style={{
                        height: "16px",
                        width: "5px",
                        backgroundColor: isDragged ? "#548BF4" : "#CCC"
                    }}
                    />
                </div>
                )}
            />
            <p className = "text-center border rounded-lg">S/. {values[0]}</p>
            <p className = "text-center border rounded-lg">S/. {values[1]}</p>
        </div>
    )
}
