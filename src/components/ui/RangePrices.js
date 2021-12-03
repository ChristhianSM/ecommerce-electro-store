import React, { useContext,useState } from 'react'
import {Range , getTrackBackground} from 'react-range'
import ProductContext from '../../context/product/ProductContext';

export const RangePrices = ({prices, category}) => {

    const {getProductsForRange} = useContext(ProductContext);

    const [isMove, setIsMove] = useState(false);

    const STEP = 1;
    const MIN = prices.lowerPrice;
    const MAX = prices.higherPrice;
    const [values, setValues] = useState([prices.lowerPrice, prices.higherPrice]);

    return (
        <div className = "mt-5">
            <h3 className = "text-lg font-bold">Precios</h3>
            <div className = "flex justify-between mt-3 text-purple-600 font-semibold text-sm text-center">
                <div className = "">
                    <p>Minimo</p>
                    <p className = "text-center">S/. {values[0]}</p>
                </div>
                <div>
                    <p>Maximo</p>
                    <p className = "text-center">S/. {values[1]}</p>
                </div>
            </div>
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
                        setIsMove(true);
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
                        height: "5px",
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
                        backgroundColor: isDragged ? "#548BF4" : "#cccccc"
                    }}
                    />
                </div>
                )}
            />
            <button 
                className = {`text-center mx-auto block border  px-5 py-2 mt-2 rounded-lg text-white ${isMove ? "bg-purple-500" : "bg-gray-500 text-black cursor-not-allowed"}`}
                onClick = {() => {
                    getProductsForRange(values[0], values[1], category);
                }}
            >
                Filtrar por precio
            </button>
        </div>
    )
}
