// import React, { useState } from 'react';
// // import axios from 'axios';

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://votre-backend.com/api/signup', formData);
//       console.log(response.data); // Gérez la réponse du serveur selon vos besoins.
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email :</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Password :</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Confirm Password :</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <button type="submit">S'inscrire</button>
//     </form>
//   );
// }

// export default SignupForm;
