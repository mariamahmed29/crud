import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const[editIndex, setEditIndex] = useState(null);

  // Get from Localstorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if(storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save to Locstorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  // All Data
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !image || !price) {
      alert('Please fill all the fields');
      return;
    }
    const newProduct = {
      name,
      image,
      price: Number(price),
      discount: Number(discount),
    };
    if(editIndex !== null) { 
      const updatedProducts = [...products];  
      updatedProducts[editIndex] = newProduct;  
      setProducts(updatedProducts);  
      setEditIndex(null);  
    } else {
      setProducts([...products, newProduct]); 
    }
    setName('');
    setImage('');
    setPrice('');
    setDiscount('');
  };

  const handleEdit = (index) => {
    setName(products[index].name);
    setImage(products[index].image);
    setPrice(products[index].price);
    setDiscount(products[index].discount);
    setEditIndex(index); 
  }

  const handleDelete = (index) => {
    const filteredProducts = products.filter((_, i) => i !== index);
    setProducts(filteredProducts);
    localStorage.clear();
  }

  
  return (
    <div className="container my-5">
      {/* Title */}
      <h2 className='text-center mb-4 text-danger fw-bold'>Product Management System</h2>

      {/* form */}
      <div className='card shadow p-4 mb-5'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            
            <div className='col-md-4 mb-3'>
              <input type="text" 
                className='form-control' 
                placeholder='Product Name' 
                onChange={(e) => setName(e.target.value)} 
                value={name}
              />
            </div>

            <div className='col-md-4 mb-3'>
              <input type="text" 
                className='form-control' 
                placeholder='Image Url' 
                onChange={(e) => setImage(e.target.value)} 
                value={image}
              />
            </div>

            <div className='col-md-4 mb-3'>
              <input type="text"
                className='form-control'
                placeholder='Product Price'
                onChange={(e) => setPrice(e.target.value)} 
                value={price}
              />
            </div>
          </div>

          <div className='col-md-4 mb-3'>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                />
          </div>

          <button type='submit' className='btn btn-danger w-100'>
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>


      <div className='row'>
        {products.map((product, index) => (
          <div className='col-md-4 mb-4' key={index}>
            <div className='card shadow-sm h-100'>
              <img src={product.image} className='card-img-top' alt={product.name} />

              <div className='card-body'>
                <h5 className='card-title fw-bold'>{product.name}</h5>
                <p className='card-text text-primary fw-bold'>
                  Price: <span className="text-decoration-line-through">${product.price}</span>
                </p>
                <p className='card-text text-success fw-bold'>
                  {product.discount > 0 ? `Discount: ${product.discount}%` : 'No discount'}
                </p>
                <p className="fw-bold">
                  {product.discount > 0 ? `Final Price: $${product.price - (product.price * product.discount) / 100}` : `Final Price: $${product.price}`}
                </p>
                <div>
                  <button className='btn btn-sm btn-outline-warning me-2' onClick={() => handleEdit(index)}>Edit</button>
                  <button className='btn btn-sm btn-outline-danger me-2' onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
