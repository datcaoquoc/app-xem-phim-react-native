const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = gql`

    type Query{
        users: [User],
        user(id: ID!):User,
        phimten(ten: String!):Phim,
        phims: [Phim],
        phim(id: ID!):Phim,
        loaiphims: [Loaiphim],
        loaiphim(id: ID!): Loaiphim,
        loaiphimten(tenloai: String!):Phim
        quocgias: [Quocgia],
        quocgia(id: ID!):Quocgia
        phimphantrang(SoTrang : Int!):[Phim!]
         
    }

    type Mutation{
        checkuser(taikhoan: String!, matkhau: String!):User
        taouser(
            taikhoan: String!,
            matkhau: String!,
            email: String!
        ):User
        themphim(
            anhphim: String!,
            tenphim: String!,
            mota: String!,
            namphathanh: String!,
            urlvideophim: String!,
            daodien: String!,
            quocgiaId: ID!,
            loaiphimId: ID!,
            urltrailer: String!,
            luotthich: Int,
            luotxem: Int
            ):Phim
        
        capnhatphim(
            id: ID!,
            anhphim: String!,
            tenphim: String!,
            mota: String!,
            namphathanh: String!,
            urlvideophim: String!,
            daodien: String!,
            quocgiaId: ID!,
            loaiphimId: ID!,
            urltrailer: String!,
            luotthich: Int,
            luotxem: Int
        ):Phim
        xoaPhim(id: ID!):Phim
    }

    type User{
        id: ID!
        taikhoan: String! 
        matkhau: String! 
        email: String!

    }

    type Phim {
        id: ID!
        anhphim: String!
        tenphim: String!
        mota: String!
        namphathanh: String!
        urlvideophim: String!
        daodien: String!
        quocgia: Quocgia
        loaiphim: Loaiphim
        urltrailer: String!
        luotthich: Int
        luotxem: Int
    }

    type Loaiphim{
       id: ID!
       tenloai: String!
    }    
    type Quocgia{
        id: ID!
        tenquocgia: String!
     }    
`;
let aidi = 0;
const listuser=[];
const listphim = [];
const listloaiphim = [
    {id: 1, tenloai: "Hành động"},
    {id: 2, tenloai: "Phim chiếu rạp"},
    {id: 3, tenloai: "Siêu anh hùng"},
    {id: 4, tenloai: "Viễn tưởng"},
    {id: 5, tenloai: "Tâm lý"},
    {id: 6, tenloai: "Kinh dị"},
    {id: 7, tenloai: "Chiến tranh"},
    {id: 8, tenloai: "Bom tấn"},
    {id: 9, tenloai: "Hoạt hình"},
    {id: 10, tenloai: "Phiêu lưu"},
    {id: 11, tenloai: "Hài hước"},
    {id: 12, tenloai: "Viễn tây"},
];
const listquocgia = [
    {id: 1, tenquocgia: "Anh"},
    {id: 2, tenquocgia: "Pháp"},
    {id: 3, tenquocgia: "Tây Ban Nha"},
    {id: 4, tenquocgia: "Việt Nam"},
    {id: 5, tenquocgia: "Mỹ"},
    {id: 6, tenquocgia: "Trung Quốc"},
    {id: 7, tenquocgia: "Hàn Quốc"},
    {id: 8, tenquocgia: "Canada"},
]

const resolvers = {
    Query: {
        users:() => listuser,
        phims:() => listphim,
        phim:(parent, args)=>{
            return listphim.find(phim=>phim.id == args.id);
        },
        phimten:(parent, args)=> {
            return listphim.find(phim=> phim.tenphim == args.ten);   
        },
        loaiphimten:(parent, args)=>{
            return listphim.find(phim=> phim.tenloai == args.tenloai); 
        },
        loaiphims:() => listloaiphim,
        loaiphim:(parent, args)=>{
            return listloaiphim.find(loaiphim=>loaiphim.id == args.id);
        },
        quocgias:() => listquocgia,
        quocgia:(parent, args)=>{
            return listquocgia.find(quocgia=>quocgia.id == args.id);
        },
        phimphantrang: (parent, args) => {
            var ds = []
            var i = (args.SoTrang - 1) * 4
            var offset = i + 4
            ds = listphim.slice(i, offset)
            console.log(args.SoTrang)
            return ds;
        },


    },

    Mutation: {
        taouser:(parent, args)=> {
            const usermoi = {
                id: `${aidi++}`,
                taikhoan: args.taikhoan,
                matkhau: args.matkhau,
                email: args.email
            }
            listuser.push(usermoi)
            return usermoi;
        },
           checkuser:(parent, args) => {
            const tennguoidung = listuser.find(users => users.taikhoan == args.taikhoan);
            // if(!tennguoidung){
            //     console.log("không tồn tại")
            //     return Error('Người dùng không tồn tại');
                
            // }
            if(tennguoidung){
                if(args.matkhau == tennguoidung.matkhau){
                    console.log("đúng")
                    return tennguoidung;
                }
                else{
                    console.log("sai mk")
                    return new Error('mật khẩu không chính xác');
                    
                }
            }
          },
        themphim:(parent, args) => {
            const phimmoi = {
                id: `${aidi++}`,
                anhphim: args.anhphim,
                tenphim: args.tenphim,
                mota: args.mota,
                namphathanh: args.namphathanh,
                urlvideophim: args.urlvideophim,
                daodien: args.daodien,
                quocgiaId: args.quocgiaId,
                loaiphimId: args.loaiphimId,
                urltrailer: args.urltrailer,
                luotthich: args.luotthich,
                luotxem: args.luotxem
            }
            listphim.push(phimmoi)
            return phimmoi;

        },
        capnhatphim:(parent, args)=> {
            const vitriIdphim = listphim.findIndex(phim => phim.id == args.id)
            console.log(vitriIdphim);
            if(vitriIdphim >= 0){
                listphim[vitriIdphim].anhphim = args.anhphim;
                listphim[vitriIdphim].tenphim = args.tenphim;
                listphim[vitriIdphim].mota = args.mota;
                listphim[vitriIdphim].namphathanh = args.namphathanh;
                listphim[vitriIdphim].urlvideophim = args.urlvideophim;
                listphim[vitriIdphim].daodien = args.daodien;
                listphim[vitriIdphim].quocgiaId = args.quocgiaId;
                listphim[vitriIdphim].loaiphimId = args.loaiphimId;
                listphim[vitriIdphim].urltrailer = args.urltrailer;
                listphim[vitriIdphim].luotthich = args.luotthich;
                listphim[vitriIdphim].luotxem = args.luotxem;
                return listphim[vitriIdphim]
            }
        },
        xoaPhim:(parent, args)=> {
            const vitriIdxoa = listphim.findIndex(phim => phim.id == args.id)
            if(vitriIdxoa > -1){
                const abc = listphim.splice(vitriIdxoa, 1);
                return abc[0]
            }
        }
        
    },

    Phim: {
        quocgia: (parent, args) => {
            return listquocgia.find(quocgia => quocgia.id == parent.quocgiaId)
        },
        loaiphim: (parent, args) => {
            return listloaiphim.find(loaiphim => loaiphim.id == parent.loaiphimId)
        }
    },
}

const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
const PORT = 4000; 
app.listen({ port: PORT }, () => {
    console.log(`http://localhost:${PORT}${server.graphqlPath}`);
  });

