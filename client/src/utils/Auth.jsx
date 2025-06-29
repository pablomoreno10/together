export const getTokenPayload = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id || payload._id,
      name: payload.name,
      teamId: payload.teamId,
      role: payload.role,
    };
  } catch (err) {
    console.error("Failed to decode token payload:", err.message);
    return {};
  }
};

export const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id;
    } catch {
      return null;
    }
  };

 export const getUserRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  };