export const createLogDetails = (where, type, error, info) => {
  if (error) {
    const {
      message, name, stack, ...errorRemaining
    } = error;

    return {
      type,
      where,
      stack,
      componentStack: info ? info.componentStack : undefined,
      message,
      errName: name,
      error: errorRemaining,
    };
  }

  const { message, ...infoRemaining } = info;

  return {
    type,
    where,
    message,
    info: infoRemaining,
  };
};

// TODO: Remove when more than one function is exported
export default createLogDetails;
