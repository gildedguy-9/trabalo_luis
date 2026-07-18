import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  offerPrice: number | null;
  stock: number;
  image: string;
}

export interface User {
  name: string;
  email: string;
  dob: string; // YYYY-MM-DD
  password: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  products: Product[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  blockedAccounts: string[];
  loginAttempts: Record<string, number>;
  loadingUsers: boolean;
  apiError: string | null;
  registerUser: (user: User) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  addToCart: (productId: number) => { success: boolean; message: string };
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  confirmPurchase: () => { success: boolean; message: string };
  resetStockAndClearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Centella del Sur',
    category: 'Pura Sangre',
    description: 'Yegua Pura Sangre de 3 años, hija del legendario campeón "Trueno". Destaca por su agilidad y velocidad explosiva en distancias cortas de 1000m a 1200m. Ideal para carreras clásicas en arena.',
    price: 18500000,
    offerPrice: 15990000,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    name: 'Rayo Veloz',
    category: 'Pura Sangre',
    description: 'Macho Pura Sangre de 4 años. Ganador de múltiples premios locales y 3 carreras de Grupo 1. Posee un temperamento competitivo y una zancada espectacular para pistas de césped.',
    price: 22000000,
    offerPrice: null,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    name: 'Tormenta Árabe',
    category: 'Árabe',
    description: 'Semental Árabe de 5 años. Resistencia insuperable, ideal para carreras de larga distancia (Endurance). Su linaje de sangre pura importada garantiza longevidad y una salud impecable.',
    price: 25000000,
    offerPrice: 22500000,
    stock: 5,
    image: '/tormenta_arabe.jpg',
  },
  {
    id: 4,
    name: 'Viento Plateado',
    category: 'Cuarto de Milla',
    description: 'Caballo Cuarto de Milla de 3 años. Aceleración explosiva incomparable en distancias cortas (400 metros). Fuerte masa muscular y excelente disposición para el entrenamiento diario.',
    price: 14000000,
    offerPrice: 12000000,
    stock: 4,
    image: '/viento_plateado.jpg',
  },
  {
    id: 5,
    name: 'Aura Imperial',
    category: 'Pura Sangre',
    description: 'Yegua campeona de 3 años. Hija de "Aura Real" y "Coronel". Ganadora invicta de su última temporada. Su valor genético la hace una candidata ideal tanto para competir como para la crianza.',
    price: 30000000,
    offerPrice: 27000000,
    stock: 1,
    image: '/aura_imperial.jpg',
  },
  {
    id: 6,
    name: 'Pegaso Negro',
    category: 'Árabe',
    description: 'Hermoso semental Árabe negro azabache de 4 años. Estampa imponente, elegancia natural y agilidad superior. Entrenado tanto para exhibición como para carreras de velocidad y salto.',
    price: 19000000,
    offerPrice: null,
    stock: 6,
    image: '/pegaso_negro.jpg',
  },
  {
    id: 7,
    name: 'Trueno Dorado',
    category: 'Cuarto de Milla',
    description: 'Caballo Cuarto de Milla de 5 años. Excelente historial en pistas cortas y de tierra. (Nota: Actualmente sin stock disponible para venta inmediata, consúltanos por futuras camadas).',
    price: 16500000,
    offerPrice: 15000000,
    stock: 0,
    image: '/trueno_dorado.jpg',
  },
  {
    id: 8,
    name: 'Duquesa del Prado',
    category: 'Appaloosa',
    description: 'Yegua Appaloosa de carrera. Pelaje moteado espectacular y gran resistencia en terrenos pedregosos. Su temperamento dócil facilita enormemente la conducción a altas velocidades.',
    price: 12500000,
    offerPrice: 10990000,
    stock: 4,
    image: '/duquesa_del_prado.jpg',
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or set defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('haras_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Map over parsed items to update the images to the new ones, so users see the changes instantly
      return parsed.map((p: Product) => {
        const initial = INITIAL_PRODUCTS.find(initP => initP.id === p.id);
        if (initial) {
          return { ...p, image: initial.image };
        }
        return p;
      });
    }
    return INITIAL_PRODUCTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('haras_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('haras_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('haras_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [loginAttempts, setLoginAttempts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('haras_login_attempts');
    return saved ? JSON.parse(saved) : {};
  });

  const [blockedAccounts, setBlockedAccounts] = useState<string[]>(() => {
    const saved = localStorage.getItem('haras_blocked_accounts');
    return saved ? JSON.parse(saved) : [];
  });

  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Sync to localStorage when states change
  useEffect(() => {
    localStorage.setItem('haras_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('haras_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('haras_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('haras_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('haras_login_attempts', JSON.stringify(loginAttempts));
  }, [loginAttempts]);

  useEffect(() => {
    localStorage.setItem('haras_blocked_accounts', JSON.stringify(blockedAccounts));
  }, [blockedAccounts]);

  // Load first 3 JSONPlaceholder users on initial load
  useEffect(() => {
    const apiLoaded = localStorage.getItem('haras_api_users_loaded');
    if (!apiLoaded) {
      setLoadingUsers(true);
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) {
            throw new Error('Respuesta del servidor inválida');
          }
          // Take the first 3 users
          const firstThree = data.slice(0, 3).map((item: any) => ({
            name: item.name,
            email: item.email.toLowerCase(),
            dob: '2000-01-01', // Under pauta requirement: 01-01-2000
            password: 'Inacap123',
          }));

          setUsers((prevUsers) => {
            // Filter to make sure we don't duplicate if they exist
            const filteredThree = firstThree.filter(
              (newUser) => !prevUsers.some((u) => u.email === newUser.email)
            );
            const updated = [...prevUsers, ...filteredThree];
            localStorage.setItem('haras_users', JSON.stringify(updated));
            return updated;
          });

          localStorage.setItem('haras_api_users_loaded', 'true');
          setLoadingUsers(false);
        })
        .catch((err) => {
          console.error('Error fetching initial users:', err);
          setApiError(
            err.message === 'Failed to fetch'
              ? 'Sin conexión a internet para cargar los usuarios iniciales.'
              : `Error al cargar usuarios iniciales de la API: ${err.message}`
          );
          setLoadingUsers(false);
        });
    }
  }, []);

  // Register User
  const registerUser = (newUser: User) => {
    const emailLower = newUser.email.toLowerCase();
    const userExists = users.some((u) => u.email === emailLower);

    if (userExists) {
      return { success: false, message: 'El correo electrónico ya está registrado.' };
    }

    const updatedUsers = [...users, { ...newUser, email: emailLower }];
    setUsers(updatedUsers);
    return { success: true, message: 'Usuario registrado exitosamente.' };
  };

  // Login
  const login = (email: string, password: string) => {
    const emailLower = email.toLowerCase();

    // Check if blocked
    if (blockedAccounts.includes(emailLower)) {
      return {
        success: false,
        message: 'Esta cuenta ha sido bloqueada debido a 3 intentos fallidos de contraseña y no puede iniciar sesión.',
      };
    }

    const user = users.find((u) => u.email === emailLower);

    if (!user) {
      return {
        success: false,
        message: 'El correo electrónico no se encuentra registrado en el sistema.',
      };
    }

    if (user.password === password) {
      // Reset attempts on success
      setLoginAttempts((prev) => {
        const updated = { ...prev };
        delete updated[emailLower];
        return updated;
      });
      setCurrentUser(user);
      return { success: true, message: 'Inicio de sesión exitoso.' };
    } else {
      // Wrong password
      const currentAttempts = (loginAttempts[emailLower] || 0) + 1;
      setLoginAttempts((prev) => ({
        ...prev,
        [emailLower]: currentAttempts,
      }));

      if (currentAttempts >= 3) {
        setBlockedAccounts((prev) => [...prev, emailLower]);
        return {
          success: false,
          message: 'Contraseña incorrecta. Has alcanzado el límite de 3 intentos fallidos. Tu cuenta ha sido bloqueada.',
        };
      }

      return {
        success: false,
        message: `Contraseña incorrecta. Intento ${currentAttempts} de 3. Al 3er intento la cuenta se bloqueará.`,
      };
    }
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setCart([]); // Clear temporary cart on logout or keep it? Pauta: "Al cerrar la sesión: El usuario debe dejar de estar autenticado."
  };

  // Add to cart
  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { success: false, message: 'Producto no encontrado.' };
    }

    if (product.stock <= 0) {
      return { success: false, message: 'No hay stock disponible para este caballo.' };
    }

    // Deduct stock from main list immediately
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
    );

    // Add to cart list
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    return { success: true, message: 'Caballo agregado al carrito.' };
  };

  // Remove from cart (restores all items stock)
  const removeFromCart = (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) return;

    // Restore stock
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + cartItem.quantity } : p
      )
    );

    // Remove from cart
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Update Cart Quantity
  const updateCartQuantity = (productId: number, targetQty: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    const product = products.find((p) => p.id === productId);
    if (!cartItem || !product) return;

    const diff = targetQty - cartItem.quantity;
    if (diff === 0) return;

    if (diff > 0) {
      // Adding items
      if (product.stock < diff) {
        // Not enough stock
        return;
      }
      // Deduct stock
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? { ...p, stock: p.stock - diff } : p))
      );
    } else {
      // Removing items (diff is negative)
      // Add stock back
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? { ...p, stock: p.stock - diff } : p))
      );
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: targetQty } : item
      )
    );
  };

  // Clear Cart: removes everything and restores all stock
  const resetStockAndClearCart = () => {
    // Restore all stock
    setProducts((prevProducts) => {
      const updated = [...prevProducts];
      cart.forEach((item) => {
        const pIdx = updated.findIndex((p) => p.id === item.product.id);
        if (pIdx !== -1) {
          updated[pIdx].stock += item.quantity;
        }
      });
      return updated;
    });

    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Confirm Purchase: stock is already deducted, just empty cart
  const confirmPurchase = () => {
    if (!currentUser) {
      return { success: false, message: 'Debe iniciar sesión para realizar compras.' };
    }

    if (cart.length === 0) {
      return { success: false, message: 'El carrito está vacío.' };
    }

    // Since we already deducted stock on adding to cart, we just finalize and empty cart.
    setCart([]);
    return { success: true, message: '¡Compra confirmada exitosamente! Gracias por confiar en Haras Don Luis.' };
  };

  return (
    <AppContext.Provider
      value={{
        products,
        users,
        currentUser,
        cart,
        blockedAccounts,
        loginAttempts,
        loadingUsers,
        apiError,
        registerUser,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        confirmPurchase,
        resetStockAndClearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
