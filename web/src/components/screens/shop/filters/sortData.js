export const sortArray = [
    {
        name: {
            viName: "Mới nhất",
            enName: "Latest"
        },
        sortBy: "createAt",
        sortOrder: "desc",
        formattedObject: {
            value: "createAt",
            order: "desc"
        }
    },
    {
        name: {
            viName: "Bán chạy nhất",
            enName: "Top Sales"
        },
        sortBy: "sold",
        sortOrder: "desc",
        formattedObject: {
            value: "sold",
            order: "desc"
        }
    },
    {
        name: {
            viName: "Giá tăng dần",
            enName: "Price: Low to High"
        },
        sortBy: "price",
        sortOrder: "asc",
        formattedObject: {
            value: "price",
            order: "asc"
        }
    },
    {
        name: {
            viName: "Giá giảm dần",
            enName: "Price: High to Low"
        },
        sortBy: "price",
        sortOrder: "desc",
        formattedObject: {
            value: "price",
            order: "desc"
        }
    }
]