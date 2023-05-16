
const getState = ({getStore, getActions, setStore}) => {
  return {
    store: {
      message: null,
      user: {},
      questionId: 0,
    },
    actions: {
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "api");
          const data = await resp.json();
          setStore({message: data.message});
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      setUser: (user) => {
        setStore({user});
      },
      setQuestionId: (id) => {
        setStore({questionId: id});
      },
    },
  };
};
export default getState;

