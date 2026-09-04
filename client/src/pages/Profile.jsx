import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import API_URL from "../api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "";
  });

  const [orders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });

  const [cart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      house: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const populateFormData = useCallback((userData) => {
    setFormData({
      name: userData?.name || "",
      phone: userData?.phone || "",
      address: {
        house: userData?.address?.house || "",
        street: userData?.address?.street || "",
        city: userData?.address?.city || "",
        state: userData?.address?.state || "",
        pincode: userData?.address?.pincode || "",
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/auth/profile`, {  method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        if (isMounted) {
          setUser(data.user);
          populateFormData(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (err) {
        if (!isMounted) return;

        console.error("Profile error:", err);
        setError(err.message);

        const message = err.message.toLowerCase();
        if (
          message.includes("token") ||
          message.includes("unauthorized") ||
          message.includes("authentication")
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate, populateFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      address: {
        ...current.address,
        [name]: value,
      },
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result;
      setProfileImage(image);
      try {
        localStorage.setItem("profileImage", image);
      } catch {
        alert("Image is too large to store in local browser cache.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    populateFormData(user);
    setSuccessMessage("");
    setEditing(true);
  };

  const handleCancel = () => {
    populateFormData(user);
    setEditing(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      formData.address.pincode &&
      !/^[0-9]{6}$/.test(formData.address.pincode.trim())
    ) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setSaving(true);
      setSuccessMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: {
            house: formData.address.house.trim(),
            street: formData.address.street.trim(),
            city: formData.address.city.trim(),
            state: formData.address.state.trim(),
            pincode: formData.address.pincode.trim(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setUser(data.user);
      populateFormData(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEditing(false);

      setSuccessMessage("Profile updated successfully ✓");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Update profile error:", err);
      alert(
        err.message || "Something went wrong while updating your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-4xl">✨</div>
          <p className="mt-4 text-gray-400">Loading your fashion profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
        <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-8 text-center">
          <div className="text-4xl">⚠️</div>
          <p className="mt-4 text-red-400">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-full border border-white/10 px-6 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-400 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
          >
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-500/10 px-5 py-4 text-center text-sm text-green-300">
            ✓ {successMessage}
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="relative h-40 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative px-6 pb-8 sm:px-10">
            <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-black bg-gradient-to-br from-pink-500/30 to-purple-500/20">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">👤</span>
                  )}
                </div>

                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black text-lg transition hover:scale-110 hover:border-pink-400/50"
                  title="Change profile picture"
                >
                  📷
                </label>

                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1 pb-1">
                <p className="text-xs uppercase tracking-[0.3em] text-pink-400">
                  StyleSync Member
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {user?.name || "Fashion Lover"}
                </h1>
                <p className="mt-2 text-gray-400">{user?.email || "—"}</p>
                {user?.phone && (
                  <p className="mt-1 text-sm text-gray-500">📱 {user.phone}</p>
                )}
              </div>

              {!editing && (
                <button
                  onClick={handleEdit}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-white"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </section>

        {editing && (
          <form
            onSubmit={handleSaveProfile}
            className="mt-8 rounded-3xl border border-pink-400/10 bg-white/5 p-7 backdrop-blur-xl"
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400">
                Account Settings
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Edit Profile</h2>
              <p className="mt-2 text-sm text-gray-500">
                Update your personal details and delivery address.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Personal Details</h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Email Address
                  </label>
                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-gray-500 outline-none"
                  />
                  <p className="mt-2 text-xs text-gray-600">
                    Email cannot be changed.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="flex items-center rounded-l-xl border border-r-0 border-white/10 bg-white/5 px-4 text-sm text-gray-500">
                      +91
                    </span>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData((current) => ({
                            ...current,
                            phone: value,
                          }));
                        }
                      }}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-r-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <p className="text-sm text-gray-500">
                    This address will be used for your orders.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    House / Flat / Apartment
                  </label>
                  <input
                    name="house"
                    value={formData.address.house}
                    onChange={handleAddressChange}
                    placeholder="House / Flat number"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Street / Area
                  </label>
                  <input
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    placeholder="Street / Area"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    City
                  </label>
                  <input
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    State
                  </label>
                  <input
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 6) {
                        setFormData((current) => ({
                          ...current,
                          address: {
                            ...current.address,
                            pincode: value,
                          },
                        }));
                      }
                    }}
                    placeholder="6-digit pincode"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-pink-400/40"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes ✓"}
              </button>
            </div>
          </form>
        )}

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Account Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Your StyleSync</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => navigate("/orders")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/10"
            >
              <div className="text-3xl">📦</div>
              <p className="mt-5 text-3xl font-bold">{orders.length}</p>
              <p className="mt-1 text-sm text-gray-400">My Orders</p>
              <p className="mt-4 text-xs text-gray-600">View order history →</p>
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-pink-400/30 hover:bg-white/10"
            >
              <div className="text-3xl">🛒</div>
              <p className="mt-5 text-3xl font-bold">
                {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
              </p>
              <p className="mt-1 text-sm text-gray-400">Cart Items</p>
              <p className="mt-4 text-xs text-gray-600">
                Continue shopping →
              </p>
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/10"
            >
              <div className="text-3xl">❤️</div>
              <p className="mt-5 text-3xl font-bold">{wishlist.length}</p>
              <p className="mt-1 text-sm text-gray-400">Wishlist</p>
              <p className="mt-4 text-xs text-gray-600">View saved styles →</p>
            </button>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl">✨</div>
              <p className="mt-5 text-lg font-semibold capitalize text-pink-300">
                {user?.role || "user"}
              </p>
              <p className="mt-1 text-sm text-gray-400">Account Type</p>
              <p className="mt-4 text-xs text-gray-600">StyleSync member</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Personal Information
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Full Name
                </p>
                <p className="mt-2 font-medium">{user?.name || "—"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Email Address
                </p>
                <p className="mt-2 break-all font-medium">
                  {user?.email || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Mobile Number
                </p>
                <p className="mt-2 font-medium">
                  {user?.phone ? `+91 ${user.phone}` : "Not added"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Delivery Address
                </p>

                {user?.address &&
                (user.address.house ||
                  user.address.street ||
                  user.address.city ||
                  user.address.state ||
                  user.address.pincode) ? (
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {user.address.house && (
                      <>
                        {user.address.house}
                        <br />
                      </>
                    )}
                    {user.address.street && (
                      <>
                        {user.address.street}
                        <br />
                      </>
                    )}
                    {[
                      user.address.city,
                      user.address.state,
                      user.address.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-gray-600">
                    No address added
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-3xl border border-pink-400/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-pink-400">
                  StyleSync Intelligence
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Build Your Fashion Identity ✨
                </h2>
                <p className="mt-3 max-w-xl leading-7 text-gray-400">
                  Tell StyleSync about your favorite styles, occasions and
                  fashion preferences so your AI stylist can give you better
                  recommendations.
                </p>
              </div>

              <button
                onClick={() => navigate("/stylist")}
                className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                ✨ Explore AI Stylist
              </button>
            </div>
          </div>
        </section>

        <div className="mt-14 border-t border-white/10 py-8 text-center text-sm text-gray-600">
          StyleSync AI · Your personal fashion space ✨
        </div>
      </div>
    </div>
  );
}

export default Profile;