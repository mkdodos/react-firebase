import axios from "axios";

export const reducer = async (state, action) => {
  switch (action.type) {
    case "LOAD":
      const urlComments = `http://localhost:3000/comments`;
      const urlPosts = `http://localhost:3000/posts`;
      const urlArrdone = `http://localhost:3000/arrdone`;

      const resPosts = await axios.get(urlPosts, {
        //
        params: {
          id: "2",
        },
      });
      const resComments = await axios.get(urlComments);

      const resArrdone = await axios.get(urlArrdone, {       
        params: {
          m_name: "大榮",
        },
      });

      console.log(resPosts.data);

      return {
        dataPosts: resPosts.data,
        dataComments: resComments.data,
        dataArrdone: resArrdone.data,
      };
  }
};
