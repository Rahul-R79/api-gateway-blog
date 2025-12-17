export declare const authClient: import("@connectrpc/connect").Client<{
    readonly typeName: "auth.AuthService";
    readonly methods: {
        readonly signUp: {
            readonly name: "SignUp";
            readonly I: typeof import("../../proto/auth/auth_pb").SignUpRequest;
            readonly O: typeof import("../../proto/auth/auth_pb").AuthResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly signIn: {
            readonly name: "SignIn";
            readonly I: typeof import("../../proto/auth/auth_pb").SignInRequest;
            readonly O: typeof import("../../proto/auth/auth_pb").AuthResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly validateToken: {
            readonly name: "ValidateToken";
            readonly I: typeof import("../../proto/auth/auth_pb").ValidateTokenRequest;
            readonly O: typeof import("../../proto/auth/auth_pb").ValidateTokenResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly refreshToken: {
            readonly name: "RefreshToken";
            readonly I: typeof import("../../proto/auth/auth_pb").RefreshTokenRequest;
            readonly O: typeof import("../../proto/auth/auth_pb").AuthResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly logout: {
            readonly name: "Logout";
            readonly I: typeof import("../../proto/auth/auth_pb").LogoutRequest;
            readonly O: typeof import("../../proto/auth/auth_pb").LogoutResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
    };
}>;
//# sourceMappingURL=authClient.d.ts.map