export default function Hero(){
    return (
        <section className="my-12 container">
            <h1 className="font-bold text-4xl text-center">Find your next<br /> dream job</h1>
{/*<p className="text-center text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti exercitationem error unde rerum dolores! Optio delectus impedit exercitationem harum expedita enim ad molestias nesciunt voluptatum earum aliquam neque tempore sit dolor.</p>*/}
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input type="search" placeholder="search phrase.." className="border border-gray-400 w-full rounded-md px-2 py-3" />
                <button className="bg-blue-600 text-white px-4 py-2  rounded-md">Search</button>
            </form>
        </section>
    );

}