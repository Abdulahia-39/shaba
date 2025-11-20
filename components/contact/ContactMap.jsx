const ContactMap = () => {
    return (
      <section className="flex flex-col lg:flex-row gap-10 min-h-screen lg:min-h-[75vh] w-5/6 mx-auto my-20">
        <div className="flex-1 flex flex-col gap-4 justify-center px-5">
          <i className="fa-solid fa-location-pin text-green-900 text-6xl"></i>
          <h2 className="text-4xl uppercase font-bold mb-4">Address</h2>
          <p className="">Near Borama regional hospital</p>
          <p className="">Borama, <span className="text-green-600">SOMALILAND</span></p>
        </div>

        <div className="flex-1 justify-center items-center flex">
          <iframe className="sm:min-w-xl lg:h-[450px] h-[450px] min-w-[300px] 2xl:min-w-[800px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1369.1388466706173!2d43.178692702363364!3d9.938779461299253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x162f7f5a71c4b5a3%3A0x6b5e0ae6498a6cff!2sSHABA!5e0!3m2!1sen!2sso!4v1753114571887!5m2!1sen!2sso" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    );
}

export default ContactMap;