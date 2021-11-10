import AuthState from "./context/auth/AuthState";
import UiState from "./context/loading/UiState";
import PaymentState from "./context/payment/PaymentState";
import ProductState from "./context/product/ProductState";
import { AppRoute } from "./routers/AppRoute";

function App() {
  return (
    <UiState>
      <AuthState >
        <ProductState>
          <PaymentState>
            <AppRoute />  
          </PaymentState>
        </ProductState>
      </AuthState>
    </UiState>
  );
}

export default App;
