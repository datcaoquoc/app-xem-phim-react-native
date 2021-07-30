import { gql } from '@apollo/client'

const QUERYPHIM = gql`
query getphim{
    phims{
      id
      anhphim
      tenphim
      mota
      namphathanh
      urlvideophim
      daodien	
      urltrailer
      luotthich
      luotxem
      quocgia{
        id
        tenquocgia
      }
      loaiphim{
        id
        tenloai
      }
      
    }
  }
`;
const CHECK_USERS = gql`
mutation check($taikhoan: String!, $matkhau: String!){
  checkuser(taikhoan: $taikhoan, matkhau: $matkhau){
    id
    taikhoan
    matkhau
    email
  }
}
`;
const THEM_USER = gql`
mutation ThemUser($taikhoan: String!, $matkhau: String!, $email: String!){
  taouser(taikhoan: $taikhoan, matkhau: $matkhau, email: $email){
    id
    taikhoan
    matkhau
    email
  }
}
`;
const THEM = gql`
mutation themPhim($anhphim: String!, $tenphim: String!, $mota: String!, $namphathanh: String!, $urlvideophim: String!,$daodien: String!,$quocgiaId: ID!, $loaiphimId: ID!,$urltrailer: String!){
  themphim(anhphim: $anhphim, tenphim: $tenphim, mota: $mota, namphathanh: $namphathanh,urlvideophim: $urlvideophim,daodien: $daodien,quocgiaId: $quocgiaId, loaiphimId: $loaiphimId,urltrailer: $urltrailer){
    id
    anhphim
    tenphim
    mota
    namphathanh
    urlvideophim
    daodien	
    urltrailer
    luotthich
    luotxem
    quocgia{
      id
      tenquocgia
    }
    loaiphim{
      id
      tenloai
    }
  }
}
`;
const UPDATE_PHIM = gql`
mutation capnhat($id: ID! ,$anhphim: String!, $tenphim: String!, $mota: String!, $namphathanh: String!, $urlvideophim: String!,$daodien: String!,$quocgiaId: ID!, $loaiphimId: ID!,$urltrailer: String!){
  capnhatphim(id: $id,tenphim: $tenphim, anhphim: $anhphim,mota: $mota,namphathanh: $namphathanh,urlvideophim: $urlvideophim,daodien: $daodien,quocgiaId: $quocgiaId,loaiphimId: $loaiphimId,urltrailer: $urltrailer){
   id
    tenphim
    mota
    namphathanh
    mota
    daodien	
    urltrailer
    luotthich
    luotxem
    quocgia{
      id
      tenquocgia
    }
    loaiphim{
      id
      tenloai
    }
  }
}
`;
const XOA_PHIM = gql`
mutation xoaphim($id: ID!){
  xoaPhim(id: $id){
    id
  }
}
`;
const LISTPHIM_PHANTRANG = gql`
query phantrang ($Sotrang: Int!){
  phimphantrang(SoTrang: $Sotrang){
     id
    anhphim
    tenphim
    mota
    namphathanh
    urlvideophim
    daodien	
    urltrailer
    luotthich
    luotxem
    quocgia{
      id
      tenquocgia
    }
    loaiphim{
      id
      tenloai
    }
  }
}
`;

export{
    QUERYPHIM,
    THEM,
    UPDATE_PHIM,
    XOA_PHIM,
    CHECK_USERS,
    THEM_USER,
    LISTPHIM_PHANTRANG
}