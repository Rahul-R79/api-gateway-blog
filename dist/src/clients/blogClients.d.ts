export declare const blogClient: import("@connectrpc/connect").Client<{
    readonly typeName: "blog.PostService";
    readonly methods: {
        readonly createPost: {
            readonly name: "CreatePost";
            readonly I: typeof import("../../proto/blog/blog_pb").CreatePostRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").CreatePostResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly getPost: {
            readonly name: "GetPost";
            readonly I: typeof import("../../proto/blog/blog_pb").GetPostRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").GetPostResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly listPosts: {
            readonly name: "ListPosts";
            readonly I: typeof import("../../proto/blog/blog_pb").ListPostsRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").ListPostsResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly deletePost: {
            readonly name: "DeletePost";
            readonly I: typeof import("../../proto/blog/blog_pb").DeletePostRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").DeletePostResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly editPost: {
            readonly name: "EditPost";
            readonly I: typeof import("../../proto/blog/blog_pb").EditPostRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").EditPostResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
        readonly requestUploadUrl: {
            readonly name: "RequestUploadUrl";
            readonly I: typeof import("../../proto/blog/blog_pb").UploadUrlRequest;
            readonly O: typeof import("../../proto/blog/blog_pb").UploadUrlResponse;
            readonly kind: import("@bufbuild/protobuf").MethodKind.Unary;
        };
    };
}>;
//# sourceMappingURL=blogClients.d.ts.map