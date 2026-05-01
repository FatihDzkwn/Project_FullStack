// UserController.js
export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id; // Didapat dari middleware auth

        const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });
        
        res.status(200).json({ 
            success: true, 
            message: "Profil berhasil diperbarui", 
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        // 1. Cek password lama
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ success: false, message: "Password lama salah" });

        // 2. Hash & simpan password baru
        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password berhasil diganti" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};