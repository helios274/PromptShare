import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-content justify-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient">Where AI Prompts Unite!</span>
      </h1>
      <p className="text-lg text-gray-600 sm:text-xl text-center mt-3.5 px-3">
        Spur your AI chatbot's creativity to new heights with PromptShare! We
        provide a platform where you can discover and share captivating prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
