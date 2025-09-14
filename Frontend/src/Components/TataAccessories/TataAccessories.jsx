import React, { useState } from "react";
import "./TataAccessories.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { accessories } from "./accesosariesdata";

const TataAccessories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCarModel, setSelectedCarModel] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const categories = [
    { id: "all", name: "All Accessories" },
    { id: "interior", name: "Interior" },
    { id: "exterior", name: "Exterior" },
    { id: "tech", name: "Technology" },
    { id: "protection", name: "Protection" },
  ];

  const carModels = [
    { id: "all", name: "All Models" },
    { id: "nexon", name: "Nexon" },
    { id: "harrier", name: "Harrier" },
    { id: "safari", name: "Safari" },
    { id: "altroz", name: "Altroz" },
    { id: "tiago", name: "Tiago" },
    { id: "tigor", name: "Tigor" },
    { id: "punch", name: "Punch" },
    { id: "curvv", name: "Curvv" },
  ];

  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Top Rated" },
  ];

  const addToCart = (accessory) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === accessory.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === accessory.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...accessory, quantity: 1 }];
      }
    });

    setAddedItems((prev) => ({ ...prev, [accessory.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [accessory.id]: false }));
    }, 2000);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const filteredAccessories = accessories
    .filter(
      (accessory) =>
        (selectedCategory === "all" ||
          accessory.category === selectedCategory) &&
        (selectedCarModel === "all" || accessory.model === selectedCarModel)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      }
    });

  return (
    <div className="tata-accessories-page">
      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
        <i className="fas fa-shopping-cart"></i>
        {cartItems.length > 0 && (
          <span className="cart-count">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="close-cart" onClick={() => setShowCart(false)}>
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>{formatPrice(item.price)}</p>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h4>Total: {formatPrice(calculateTotal())}</h4>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <div className="accessories-header">
        <div className="container">
          <h1>Tata Motors Genuine Accessories</h1>
          <p>
            Enhance your driving experience with premium accessories designed
            specifically for your Tata car
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Car Model</label>
              <select
                value={selectedCarModel}
                onChange={(e) => setSelectedCarModel(e.target.value)}
              >
                {carModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredAccessories.map((accessory) => (
              <div key={accessory.id} className="product-card">
                <div className="product-image">
                  <img src={accessory.image} alt={accessory.name} />
                  {accessory.featured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{accessory.name}</h3>
                  <div className="product-meta">
                    <span className="model-badge">
                      {accessory.model.toUpperCase()}
                    </span>
                    <span className="category-badge">{accessory.category}</span>
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`star ${
                          i < Math.floor(accessory.rating) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-value">({accessory.rating})</span>
                  </div>
                  <div className="price">{formatPrice(accessory.price)}</div>
                  <button
                    className={`add-to-cart-btn ${
                      addedItems[accessory.id] ? "added" : ""
                    }`}
                    onClick={() => addToCart(accessory)}
                  >
                    {addedItems[accessory.id] ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredAccessories.length === 0 && (
        <div className="empty-state">
          <div className="container">
            <h3>No accessories found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TataAccessories;
