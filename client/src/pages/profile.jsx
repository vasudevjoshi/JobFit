import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit3, Save, X, Camera, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/Auth.jsx';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch user profile on component mount
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        FullName: user.FullName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('jobfit_token');
      const response = await fetch('https://jobfit-dk4l.onrender.com/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
      });

      const result = await response.json();
      
      if (result.success) {
        setUser(result.data);
      } else {
        toast.error(result.message || 'Failed to fetch profile');
      }
    } catch (error) {
      toast.error('Error fetching profile');
      console.error('Profile fetch error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageLoading(true);
    try {
      const token = localStorage.getItem('jobfit_token');
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch('https://jobfit-dk4l.onrender.com/api/v1/auth/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setUser(result.data);
        toast.success('Profile image updated successfully!');
      } else {
        toast.error(result.message || 'Failed to upload image');
      }
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Image upload error:', error);
    }
    setImageLoading(false);
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.FullName.trim() || !formData.email.trim()) {
      toast.error('Full Name and Email are required');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('jobfit_token');
      const response = await fetch('https://jobfit-dk4l.onrender.com/api/v1/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setUser(result.data);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Profile update error:', error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        FullName: user.FullName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
            <div className="bg-gradient-to-r from-slate-600 to-gray-700 px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={user.image || `https://api.dicebear.com/9.x/initials/svg?seed=${user.FullName}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      {imageLoading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <Camera className="w-4 h-4 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imageLoading}
                      />
                    </label>
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold">{user.FullName}</h1>
                    <p className="text-slate-200">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {user.FullName || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {user.email || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {user.phone || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-lg hover:from-slate-700 hover:to-gray-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-slate-700 text-sm">
              <strong>Note:</strong> Your email address is used for account verification and important notifications. 
              Make sure it's always up to date. Click the camera icon to update your profile picture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;