const BASE_URL_MERCADO = "https://api.mercadolibre.com";

export const getDataProductId = async (id) => {
    const promesas = await Promise.all([fetcher(`/items/${id}`), fetcher(`/items/${id}/description`)]);
    const {title, thumbnail, original_price,  price, pictures, attributes, available_quantity, seller_id} = promesas[0];
    const product = {
        title,
        thumbnail,
        original_price,
        price,
        pictures,
        attributes,
        stock: available_quantity
    }

    // Obtenemos los productos del vendedor 
    const response = await fetch(BASE_URL_MERCADO + `/sites/MPE/search?seller_id=${seller_id}`);
    const data = await response.json();

    const destription = promesas[1].plain_text;

    return [product, destription, data.results]
}

const fetcher = async (path) => {
    let response = await fetch(BASE_URL_MERCADO + path);
    let data = await response.json();
    return data;
}


// Function para calcular el total del carrito de compras
export const getTotalAmount = (products) => {
    const suma = products.reduce( (prev, current) => prev + current.amount*current.price, 0);
    return suma;
}

// Funcion para calcular el total a pagar en coutas :
export const totalToPayInCoutas = (total, numCoutas) => {
    switch (numCoutas) {
        case "3":
            return  {
                total : (total + total*0.08).toFixed(2),
                totalForCouta : ((total + total*0.08)/3).toFixed(2)
            };
        case "6":
            return  {
                total : (total + total*0.12).toFixed(2),
                totalForCouta : ((total + total*0.12)/6).toFixed(2)
            };

        case "12":
            return  {
                total : (total + total*0.2).toFixed(2),
                totalForCouta : ((total + total*0.2)/12).toFixed(2)
            };

        case "18":
            return  {
                total : (total + total*0.3).toFixed(2),
                totalForCouta : ((total + total*0.3)/12).toFixed(2)
            };
        default:
            break;
    }
}


// Ordenar productos por el precio maximo 
export const orderProducts = (products, type) => {
    if (type === "menor") {
        console.log("menor");
        products.sort( (productA, productB) => {
            if (productA.price < productB.price) return -1;
            return 1
        })
    }else if(type === "mayor") {
        console.log("mayor");
        products.sort( (productA, productB) => {
            if (productA.price > productB.price) return -1;
            return 1
        })
    }else if (type === "marcaAsc") {
        console.log("marcaAsc");
        products.sort( (productA, productB) => {
            if ((productA.marca).toLowerCase() < (productB.marca).toLowerCase()) return -1;
            return 1;
        })
    }else if (type === "marcaDesc") {
        console.log("marcaDesc");
        products.sort( (productA, productB) => {
            if ((productA.marca).toLowerCase() > (productB.marca).toLowerCase()) return -1;
            return 1
        })
    }
    return (products);
}