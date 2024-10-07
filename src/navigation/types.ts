// types.ts
export type RootStackParamList = {
    ZonasRiego: { idUsuario: number; refresh?: boolean };  // idUsuario es requerido, refresh es opcional
    AgregarZona: { idUsuario: number };
    Login: undefined;  // Login no tiene parámetros
    Registro: undefined;  // Registro no tiene parámetros
  };
  