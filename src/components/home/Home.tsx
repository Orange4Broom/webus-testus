/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useRegistration } from '../../hooks/useRegistration';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { Icon } from '../icon/Icon';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { projectFirestore } from '../../firebase/config';
import { useToastify } from '../../hooks/useToastify';

interface Product {
  Product_Id: string;
  Product_Name: string;
  Product_Price: number;
  Product_DPH: number;
  Product_DPH_Price: number;
}

export const Home = () => {
  const { state } = useAuthContext();

  const [register, setRegister] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [adding, setAdding] = useState<boolean>(false);

  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productDPH, setProductDPH] = useState<number>(0);
  const [productDPHPrice, setProductDPHPrice] = useState<number>(0);

  const [editing, setEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDPH, setEditDPH] = useState<number>(0);
  const [editDPHPrice, setEditDPHPrice] = useState<number>(0);

  const { login } = useLogin();
  const { registration } = useRegistration();
  const { logout } = useLogout();
  const { data, isPending, error } = useFetchFirestore<Product>('Products');

  const { notify } = useToastify();

  console.log(data, isPending, error);

  const addProduct = async () => {
    const uuid = uuidv4();
    const newProduct = {
      Product_Id: uuid,
      Product_Name: productName,
      Product_Price: productPrice,
      Product_DPH: productDPH,
      Product_DPH_Price: productDPHPrice,
    };

    const userRef = doc(collection(projectFirestore, 'Products'), uuid);

    try {
      await setDoc(userRef, newProduct);
      resetForm();

      notify('success', 'Produkt byl přidán');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice(0);
    setProductDPH(0);
    setProductDPHPrice(0);
  };

  const deleteProduct = async (productId: string) => {
    const productRef = doc(projectFirestore, 'Products', productId);

    try {
      await deleteDoc(productRef);
      notify('success', 'Produkt byl smazán');
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const editProduct = async (productId: string) => {
    const productRef = doc(projectFirestore, 'Products', productId);

    const updatedProduct = {
      Product_Id: editId,
      Product_Name: editName,
      Product_Price: editPrice,
      Product_DPH: editDPH,
      Product_DPH_Price: editDPHPrice,
    };

    try {
      await updateDoc(productRef, updatedProduct);
      notify('success', 'Produkt byl upraven');
      resetForm();
    } catch (error) {
      console.error('Error editing product: ', error);
    }
  };

  return (
    <div>
      <h1>Bruh</h1>
      {state.user ? (
        <div>
          <h1>
            Welcome {state.user.email}{' '}
            <button onClick={() => logout()}>Logout</button>
          </h1>

          {adding ? (
            <>
              <h1>Přidat produkt</h1>
              <form>
                <label>Produkt</label>
                <br />
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <br />
                <label>Cena</label>
                <br />
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.valueAsNumber)}
                />
                <br />
                <label>DPH</label>
                <br />
                <input
                  type="number"
                  value={productDPH}
                  onChange={(e) => setProductDPH(e.target.valueAsNumber)}
                />
                <br />
                <label>Cena s DPH</label>
                <br />
                <input
                  type="number"
                  value={productDPHPrice}
                  onChange={(e) => setProductDPHPrice(e.target.valueAsNumber)}
                />
                <br />
                <button type="button" onClick={() => addProduct()}>
                  Přidat produkt <Icon name="plus" type="fas" color="" />
                </button>
                <button onClick={() => setAdding(false)}>Zrušit</button>
              </form>
            </>
          ) : (
            <button onClick={() => setAdding(true)}>Přidat produkt</button>
          )}

          {editing ? (
            <>
              <h1>Upravit Produkt</h1>
              <form>
                <label>Název</label>
                <br />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <br />
                <label>Cena</label>
                <br />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                />
                <br />
                <label>DPH</label>
                <br />
                <input
                  type="number"
                  value={editDPH}
                  onChange={(e) => setEditDPH(Number(e.target.value))}
                />
                <br />
                <label>Cena s DPH</label>
                <br />
                <input
                  type="number"
                  value={editDPHPrice}
                  onChange={(e) => setEditDPHPrice(Number(e.target.value))}
                />
                <br />
                <button
                  type="button"
                  onClick={() => {
                    editProduct(editId);
                    setEditing(false);
                  }}
                >
                  Upravit
                </button>
                <button onClick={() => setEditing(false)}>Zrušit</button>
              </form>
            </>
          ) : null}

          <h1>Tabulka Produktů</h1>
          <table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Cena</th>
                <th>DPH</th>
                <th>Cena s DPH</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.Product_Id}>
                  <td>{product.Product_Name}</td>
                  <td>{product.Product_Price}</td>
                  <td>{product.Product_DPH}</td>
                  <td>{product.Product_DPH_Price}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(true);
                        setEditId(product.Product_Id);
                        setEditName(product.Product_Name);
                        setEditPrice(product.Product_Price);
                        setEditDPH(product.Product_DPH);
                        setEditDPHPrice(product.Product_DPH_Price);
                      }}
                    >
                      <Icon name="pen" type="fas" color="" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.Product_Id)}
                    >
                      <Icon name="trash-alt" type="fas" color="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p>Chcete se?</p>
          <button
            onClick={() => {
              setRegister(!register),
                setName(''),
                setEmail(''),
                setPassword('');
            }}
          >
            {register ? 'Registrovat' : 'Přihlásit'}
          </button>
          {register ? (
            <>
              <p>Email: admin@admin.cz</p>
              <p>Heslo: admin1234</p>
              <form>
                <label>Email</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Heslo</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  type="button"
                  onClick={() => {
                    email && password ? login({ email, password }) : null;
                  }}
                >
                  Přihlásit
                </button>
              </form>
            </>
          ) : (
            <form>
              <label>Jméno</label>
              <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label>Email</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>Heslo</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="button"
                onClick={() =>
                  registration({ displayName: name, email, password })
                }
              >
                Registrovat
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
