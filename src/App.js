import AuthState from "./context/auth/AuthState";
import ModalState from "./context/modal/ModalState";
import PaymentState from "./context/payment/PaymentState";
import ProductState from "./context/product/ProductState";
import { AppRoute } from "./routers/AppRoute";

function App() {
  return (
    <ModalState>
      <AuthState >
        <ProductState>
          <PaymentState>
            <AppRoute />  
          </PaymentState>
        </ProductState>
      </AuthState>
    </ModalState>
  );
}

export default App;
