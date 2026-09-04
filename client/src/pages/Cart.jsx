import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

export function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const [addressForm, setAddressForm] = useState({
    label: "Home",
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [orderMessage, setOrderMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // =========================
  // SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // SAVE WISHLIST
  // =========================
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =========================
  // FETCH ADDRESSES
  // =========================
  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoadingAddresses(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/addresses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch addresses"
          );
        }

        const savedAddresses = data.addresses || [];

        setAddresses(savedAddresses);

        // Select default address automatically
        const defaultAddress =
          savedAddresses.find(
            (address) => address.isDefault
          ) || savedAddresses[0];

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.error(
          "Fetch addresses error:",
          error
        );
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item._id !== id) return item;

          const newQuantity =
            item.quantity + change;

          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter(Boolean)
    );
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item._id !== id
      )
    );
  };

  // =========================
  // MOVE TO WISHLIST
  // =========================
  const moveToWishlist = (product) => {
    const alreadyWishlisted =
      wishlist.some(
        (item) => item._id === product._id
      );

    if (!alreadyWishlisted) {
      setWishlist((currentWishlist) => [
        ...currentWishlist,
        product,
      ]);
    }

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item._id !== product._id
      )
    );
  };

  // =========================
  // ADDRESS FORM CHANGE
  // =========================
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // SAVE NEW ADDRESS
  // =========================
  const handleSaveAddress = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!/^\d{10}$/.test(addressForm.phone)) {
      setOrderMessage(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!/^\d{6}$/.test(addressForm.pincode)) {
      setOrderMessage(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    setIsSavingAddress(true);
    setOrderMessage("");

    try {
      const response = await fetch(
        `${API_URL}/auth/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...addressForm,
            isDefault: addresses.length === 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save address"
        );
      }

      const newAddress =
        data.address ||
        data.addresses?.[data.addresses.length - 1];

      // Refresh addresses from server
      const refreshResponse = await fetch(
        `${API_URL}/auth/addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const refreshData =
        await refreshResponse.json();

      if (!refreshResponse.ok) {
        throw new Error(
          refreshData.message ||
            "Failed to refresh addresses"
        );
      }

      const updatedAddresses =
        refreshData.addresses || [];

      setAddresses(updatedAddresses);

      const savedAddress =
        updatedAddresses.find(
          (address) =>
            newAddress &&
            address._id === newAddress._id
        ) ||
        updatedAddresses[
          updatedAddresses.length - 1
        ];

      if (savedAddress) {
        setSelectedAddress(savedAddress);
      }

      setShowAddressForm(false);

      setAddressForm({
        label: "Home",
        fullName: "",
        phone: "",
        house: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });

      setOrderMessage(
        "Address added successfully! 📍"
      );
    } catch (error) {
      console.error(
        "Save address error:",
        error
      );

      setOrderMessage(
        error.message ||
          "Failed to save address."
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  // =========================
  // CALCULATIONS
  // =========================
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount = Math.round(
    subtotal * 0.1
  );

  const delivery =
    subtotal >= 999 ? 0 : 99;

  const totalPrice =
    subtotal - discount + delivery;

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async () => {
    if (
      cart.length === 0 ||
      isPlacingOrder
    ) {
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedAddress) {
      setOrderMessage(
        "Please select a delivery address before placing your order."
      );
      return;
    }

    setOrderMessage("");
    setIsPlacingOrder(true);

    try {
      const orderItems = cart.map(
        (item) => ({
          product: item._id,
          quantity: item.quantity,
        })
      );

      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderItems,
            deliveryAddress: {
              label:
                selectedAddress.label ||
                "Home",
              fullName:
                selectedAddress.fullName,
              phone:
                selectedAddress.phone,
              house:
                selectedAddress.house,
              street:
                selectedAddress.street,
              city:
                selectedAddress.city,
              state:
                selectedAddress.state,
              pincode:
                selectedAddress.pincode,
            },
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order"
        );
      }

      // Clear cart after successful order
      setCart([]);

      localStorage.removeItem("cart");

      setOrderMessage(
        `Order ${
          data.order?.orderId || ""
        } placed successfully! 🎉`
      );

      // Go to Orders page
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      setOrderMessage(
        error.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="text-left text-sm text-gray-400 transition hover:text-white"
          >
            ← Continue Shopping
          </button>

          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
              StyleSync
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Shopping Bag 🛍️
            </h1>

            {cart.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your bag
              </p>
            )}
          </div>
        </div>

        {/* Order Message */}
        {orderMessage && (
          <div
            className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${
              orderMessage.includes(
                "successfully"
              )
                ? "border-green-400/20 bg-green-500/10 text-green-300"
                : "border-red-400/20 bg-red-500/10 text-red-300"
            }`}
          >
            {orderMessage}
          </div>
        )}

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="text-7xl">
              🛍️
            </div>

            <h2 className="mt-6 text-3xl font-semibold">
              Your bag is empty
            </h2>

            <p className="mt-3 max-w-md leading-7 text-gray-500">
              Looks like you haven't added
              anything yet. Discover
              something beautiful and make
              it yours.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Explore Fashion →
            </button>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  navigate("/wishlist")
                }
                className="mt-4 text-sm text-pink-400 transition hover:text-pink-300"
              >
                ❤️ View Wishlist
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* LEFT COLUMN */}
            <div>

              {/* Delivery Banner */}
              <div className="mb-6 rounded-2xl border border-green-400/10 bg-green-500/5 p-4">
                <p className="text-sm font-medium text-green-300">
                  🚚 Free delivery on
                  orders above ₹999
                </p>

                {subtotal < 999 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Add ₹
                    {(
                      999 - subtotal
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    more to unlock free
                    delivery.
                  </p>
                )}
              </div>

              {/* ========================= */}
              {/* DELIVERY ADDRESS */}
              {/* ========================= */}
              <div
                id="delivery-address"
                className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Delivery
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      📍 Delivery Address
                    </h2>
                  </div>

                  {addresses.length > 0 &&
                    !showAddressForm && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowAddressForm(
                            true
                          )
                        }
                        className="text-sm font-medium text-pink-400 hover:text-pink-300"
                      >
                        + Add New
                      </button>
                    )}
                </div>

                {/* Loading */}
                {isLoadingAddresses ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-500">
                    Loading your saved
                    addresses...
                  </div>
                ) : addresses.length ===
                  0 &&
                  !showAddressForm ? (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
                    <div className="text-3xl">
                      📍
                    </div>

                    <p className="mt-3 text-sm text-gray-400">
                      No delivery address
                      saved yet.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setShowAddressForm(
                          true
                        )
                      }
                      className="mt-4 rounded-full bg-pink-500 px-6 py-2.5 text-sm font-semibold transition hover:bg-pink-400"
                    >
                      + Add Address
                    </button>
                  </div>
                ) : (
                  <>
                    {/* SAVED ADDRESSES */}
                    {!showAddressForm && (
                      <div className="mt-5 space-y-3">
                        {addresses.map(
                          (address) => {
                            const isSelected =
                              selectedAddress?._id ===
                              address._id;

                            return (
                              <button
                                key={
                                  address._id
                                }
                                type="button"
                                onClick={() =>
                                  setSelectedAddress(
                                    address
                                  )
                                }
                                className={`w-full rounded-2xl border p-5 text-left transition ${
                                  isSelected
                                    ? "border-pink-400/50 bg-pink-500/10"
                                    : "border-white/10 bg-black/20 hover:border-white/20"
                                }`}
                              >
                                <div className="flex gap-4">
                                  <div className="mt-1">
                                    <div
                                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                        isSelected
                                          ? "border-pink-400"
                                          : "border-gray-600"
                                      }`}
                                    >
                                      {isSelected && (
                                        <div className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-semibold">
                                        {
                                          address.fullName
                                        }
                                      </span>

                                      <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400">
                                        {
                                          address.label
                                        }
                                      </span>

                                      {address.isDefault && (
                                        <span className="rounded-md bg-green-500/10 px-2 py-1 text-[10px] uppercase tracking-wider text-green-400">
                                          Default
                                        </span>
                                      )}
                                    </div>

                                    <p className="mt-2 text-sm text-gray-400">
                                      {
                                        address.phone
                                      }
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                      {
                                        address.house
                                      }
                                      ,{" "}
                                      {
                                        address.street
                                      }
                                      <br />
                                      {
                                        address.city
                                      }
                                      ,{" "}
                                      {
                                        address.state
                                      }{" "}
                                      -{" "}
                                      {
                                        address.pincode
                                      }
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}

                    {/* ADD ADDRESS FORM */}
                    {showAddressForm && (
                      <form
                        onSubmit={
                          handleSaveAddress
                        }
                        className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <h3 className="font-semibold">
                            Add New Address
                          </h3>

                          {addresses.length >
                            0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setShowAddressForm(
                                  false
                                )
                              }
                              className="text-sm text-gray-500 hover:text-white"
                            >
                              Cancel
                            </button>
                          )}
                        </div>

                        {/* Address Type */}
                        <div className="mb-5 flex gap-2">
                          {[
                            "Home",
                            "Work",
                            "Other",
                          ].map(
                            (label) => (
                              <button
                                key={
                                  label
                                }
                                type="button"
                                onClick={() =>
                                  setAddressForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      label,
                                    })
                                  )
                                }
                                className={`rounded-full px-4 py-2 text-xs transition ${
                                  addressForm.label ===
                                  label
                                    ? "bg-pink-500 text-white"
                                    : "border border-white/10 bg-white/5 text-gray-400"
                                }`}
                              >
                                {label ===
                                "Home"
                                  ? "🏠"
                                  : label ===
                                    "Work"
                                  ? "💼"
                                  : "📍"}{" "}
                                {label}
                              </button>
                            )
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                          <input
                            name="fullName"
                            value={
                              addressForm.fullName
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="Full Name"
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50"
                          />

                          <input
                            name="phone"
                            value={
                              addressForm.phone
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="Mobile Number"
                            inputMode="numeric"
                            maxLength={10}
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50"
                          />

                          <input
                            name="house"
                            value={
                              addressForm.house
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="House / Building"
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50 sm:col-span-2"
                          />

                          <input
                            name="street"
                            value={
                              addressForm.street
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="Street / Area"
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50 sm:col-span-2"
                          />

                          <input
                            name="city"
                            value={
                              addressForm.city
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="City"
                            required
                            className="rounded-xl border border-white/10 bg-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50"
                          />

                          <input
                            name="state"
                            value={
                              addressForm.state
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="State"
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50"
                          />

                          <input
                            name="pincode"
                            value={
                              addressForm.pincode
                            }
                            onChange={
                              handleAddressChange
                            }
                            placeholder="Pincode"
                            inputMode="numeric"
                            maxLength={6}
                            required
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/50"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={
                            isSavingAddress
                          }
                          className="mt-5 w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
                        >
                          {isSavingAddress
                            ? "Saving Address..."
                            : "Save Address"}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* PRODUCT CARDS */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-pink-400/20"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">

                      <div className="h-52 w-full overflow-hidden rounded-2xl bg-white/5 sm:h-44 sm:w-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                              {item.category}
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                              {item.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-yellow-400">
                                ★
                              </span>

                              <span className="text-sm text-gray-500">
                                {item.rating}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item._id
                              )
                            }
                            className="text-gray-600 transition hover:text-red-400"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="mt-5">
                          <p className="text-xl font-semibold">
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">

                          <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  -1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:text-white"
                            >
                              −
                            </button>

                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                moveToWishlist(
                                  item
                                )
                              }
                              className="text-xs text-gray-400 transition hover:text-pink-400"
                            >
                              ♡ Move to Wishlist
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  item._id
                                )
                              }
                              className="text-xs text-gray-500 transition hover:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wishlist Shortcut */}
              {wishlist.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/wishlist")
                  }
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-gray-400 transition hover:border-pink-400/20 hover:text-pink-300"
                >
                  ❤️ You have{" "}
                  {wishlist.length} item
                  {wishlist.length > 1
                    ? "s"
                    : ""}{" "}
                  in your wishlist →
                </button>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

                {/* Selected Address Summary */}
                {selectedAddress && (
                  <div className="mb-6 rounded-2xl border border-pink-400/10 bg-pink-500/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Deliver To
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          const element =
                            document.getElementById(
                              "delivery-address"
                            );

                          element?.scrollIntoView({
                            behavior:
                              "smooth",
                          });
                        }}
                        className="text-xs text-pink-400 hover:text-pink-300"
                      >
                        Change
                      </button>
                    </div>

                    <p className="mt-2 text-sm font-semibold">
                      {
                        selectedAddress.fullName
                      }
                      ,{" "}
                      {
                        selectedAddress.pincode
                      }
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {
                        selectedAddress.house
                      }
                      ,{" "}
                      {
                        selectedAddress.street
                      }
                      ,{" "}
                      {
                        selectedAddress.city
                      }
                    </p>
                  </div>
                )}

                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Price Details
                </p>

                <div className="mt-7 space-y-5">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Total MRP
                    </span>

                    <span>
                      ₹
                      {subtotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="text-green-400">
                      − ₹
                      {discount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Delivery
                    </span>

                    <span
                      className={
                        delivery === 0
                          ? "text-green-400"
                          : "text-white"
                      }
                    >
                      {delivery === 0
                        ? "FREE"
                        : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Total Amount
                      </span>

                      <span className="text-2xl font-bold">
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                <div className="mt-6 rounded-2xl border border-green-400/10 bg-green-500/5 p-4">
                  <p className="text-sm text-green-300">
                    🎉 You save ₹
                    {discount.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    StyleSync special offer
                    applied.
                  </p>
                </div>

                {/* Address Warning */}
                {!selectedAddress && (
                  <div className="mt-5 rounded-xl border border-yellow-400/10 bg-yellow-500/5 p-3 text-xs text-yellow-300">
                    📍 Please add a delivery
                    address to place your
                    order.
                  </div>
                )}

                {/* Place Order */}
                <button
                  type="button"
                  onClick={
                    handlePlaceOrder
                  }
                  disabled={
                    isPlacingOrder ||
                    !selectedAddress
                  }
                  className="mt-6 w-full rounded-full bg-pink-500 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPlacingOrder
                    ? "Placing Order..."
                    : "Place Order →"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="mt-3 w-full rounded-full border border-white/10 bg-white/5 py-3.5 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">
                    🔒
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">
                    Secure
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">
                    🚚
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">
                    Fast Delivery
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">
                    ✨
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">
                    AI Curated
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-600">
          StyleSync AI · Fashion that understands you ✨
        </div>
      </div>
    </div>
  );
}

export default Cart;