import { Button, Label, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import NavbarAccuiel from "@/apprenants/components/NavbarAccuiel";
import NavApprenant from "@/apprenants/components/NavApprenant";
import NavbarAccuielSite from "@/apprenants/components/NavbarAccuielSite";
import NavApprenantSite from "@/apprenants/components/NavApprenantSite";

const MesCoursApprenant = () => {
  const token = Cookies.get("token");
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/MesFormationSuivies?token=" + token)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  return (
    <>
      <NavbarAccuiel />

      <NavApprenant />

      <div className="head-app-21">
        <h1 style={{ fontSize: "30px", fontWeight: "600", paddingTop: "50px" }}>Lorem ipsum dolor sit amet.</h1>
        <div className="div-flex">
          <div className="div-colonne-1">
            <div className="div-flex-im-cours">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/e971/c21c/8fa9fb069750a4dd956e45a77a8b9422?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GpUJ2f3uCu6J5B5yTGBUGmnzMlnLYSyS~5cO4-aeAGcSH-~KG0sKA~B8GXLUSBcYv7WTxvJfhEVkRFgrPGZxDUZGlH~DCgryxPjQQ0q79F3cp3OMieGPMPgcxHeP2g0~S2j~AFfuGxqU2VcJoyhaKCaB8bUD7f6nlHoijj0GgfDdF3qSJbxKcRIAr8F4m516t9sV0MBxmkUE-9x0PFgm1pjClEGxi8J1KhWu-Mp9LTjg9CdMIB1ewpuaZsAvnhyfhKzDJ9z1QBj4reHTMCEnS3giZG6E82LeJuAALCSKMSXo15bFWrlB9XT0WRtesp1KjKngb7rA7WQS2mWFoCgcLg__"
                  alt=""
                  className="img-mes-cours"
                />
              </div>
              <div>
                <h2 className="h2">Lorem ipsum</h2>
                <p className="p">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="div-flex-im-cours">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/6acd/256c/595c118b437dffc291c142f877d79659?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pq1So--oXEF93jkZ6gTp0xVIVu1g8lS3ags9Xe-D6zuBpb-mzIzc6LtmgENbDjXFfzxl91DpgVQsXESRoymUKxUVeqZpQYrj4DnBBlcPexrbV2Ye7Gif1mLZHpqiTjc~Z9VU402adthhmaJJQvp4~y9-4sVJ-82lpy2jaKfUTUDxlZ~VoC3HKzlHCWt0hLCMQ9JfuoGSsahdXuPFsZNKtJhAu-E00095j6Ta3dwEszhI94naU166vFfTqiWJPHI-C8iOcxWhGytwi1-ZmJubzK5J~cscUi1tDUfgFPuZGWjI1NVOKfBbe5OldUJfXJPSNY7D9N0gVRo~jw2OeaDdkA__"
                  alt=""
                  className="img-mes-cours"
                />
              </div>
              <div>
                <h2 className="h2">Lorem ipsum</h2>
                <p className="p">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="div-flex-im-cours">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/354b/8575/29b356bb5c8b4d94d890bbeb0a642ef1?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ChfxQe6gLm5NfSkNEQmRi6INC-P88-KlXDYkQsX6hqMNv6efmtXnaivsCynP1gGT7qKY8fwgxWSScefcz~RT7GRZVTGApD0XTU7tOvCk3lMM5tFhGRy4a8pfJqvssxNmqXXwfd6g17UkEi7G9Stq~03sO74Fu5wvdBfS8oqvIgcYV~qzQW1T1ZVffEdxNva715oPlYkFvIJNza9J1k6PhoGUgQlcrXRmfbDwpX924AVqPUWf9KV4wToYriRfvWJaZro9VgPGxQP6V1-PVPo1mfGgsGYnzk~YMuUvTLMI1YIIMW3nh0sfSl2aztc0zQYaBIifRBhTgOprDSR-m6W5ug__"
                  alt=""
                  className="img-mes-cours"
                />
              </div>
              <div>
                <h2 className="h2">Lorem ipsum</h2>
                <p className="p">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="div-flex-im-cours">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/06fe/1445/2cef215d6e6047c797d7d03ed941c6f0?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kyd9xyh4b53aaAtHz44COVP-RvNxNMrNcrWWsgbEhZmmFGxFgbMnlfxF0F1AwY2TgOJhaH2IGa4srAXiAqaglHvbPmbcvAb9wBCLkFGvmf5bNulQ0BitQzpyRBjEzMxNaGAO5fpS06eSJJ-VuCzKZslSS-62MUEixi~nhTtvG~UlCAXcfNstt0EcOFvieaYLNPQKCOC7kpSs~QavUUWrc-3-W5bL8AERf4CJpKmBQ9HtpMddsux5iXn2qnuv2Jq8W~jOcxhI0bruYlu9Mg6mEVhbjh6v6hd9LimfOEHKfRmLyu6MsgdJiFRyB99~Mj3C7v5gBxsgHQkf5od4y-X8Pw__"
                  alt=""
                  className="img-mes-cours"
                />
              </div>
              <div>
                <h2 className="h2">Lorem ipsum</h2>
                <p className="p">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="div-flex-im-cours">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/da59/31d9/718ab5501bae30c6d9eae8ab9923313c?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyIJXQ19s7nPvHNad1lRHT-rvI5MlaigPJHlVoZVhaD8f3kqZFvVD6u2usv1XlklzCHNigJ9o-qQywrPYvmW79aC58lFdosPFa6ZxjlAeUNObaR~KIZvQSCsBf-vo5kVwi0LYYCIjanuHZ3ouEyfhhPw0NINhUyS0Np1VFRDof4J0mVgSqqpMmzuHlFB-NCjJmMFRLytxhr3zLOETO~XfrqkFvxo4S54FHQXOjmXKiTtdc2Vu~dstX2Kyb4GrVVUY3A4RD4KZH6P-5XEvYRYTGO7uAnjaDA3CQYceXqDKzbu2ITyoGHRBC78daziPB0qN1x0nUGNJL3vwdPQ40ZF6A__"
                  alt=""
                  className="img-mes-cours"
                />
              </div>
              <div>
                <h2 className="h2">Lorem ipsum</h2>
                <p className="p">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="div-colonne-2">
            <div className="div-flex-mes-cours">
              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/9945/6bc5/20a5c899a6982914b1fc4daf89ea7528?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jxiie5qqtQ2KTSMkTULurV2P7K0kCbHF0X5BEhMrdb3ERCVpRe8V3QVeYUPgcFHnQzgiKW5ICSDkFsx9Vpd8OO4y9kX1nN--5J6URmBaRfj8PO6LyTAzr~W~5ZhIHb~9lyPQ0EeyDdY3eH8g-NNLA84Nn114yTC0bCcnImt8c3J6fVphnjrRTudKwKJu3Sj7QNpSKvB6HANxYfQvqLk8nQ6rkbRpjDog2TJmv1~JoaFcgIEKQ5oWq8xaA5-6qAYJSv5hJmJpzWiNryuSpOXV5~hMpysyeafYQFg~jaexElKbbj9eLvva8TAsyzr2NMK8iDPNRiBMZuFOAtEEYvGPWA__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>

              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/1111/4c6a/e36c1c23bb6c664dd26ac8822003b9aa?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgcjGTENf0ilbe9ciQw2dKqv9dlTNJbquFWPkW6QXLOtNtaUeFFBk64EH5lcSPtufKsi6Mv12F-R7ci85O38YBcL6xF~e2Dz88hQYzxNxpT4HPoWU0SLVLXP9mx6NlI46r3Cm~k7znaoHGBXdy0P~U-VX0SGx4wn9YG1UW1cYuiytNk6Fw0K2M9fcFgj1D6CewdfdGh~ZUeE2l5EkUHwwT1iCJSf3xUmqxBjSfCY~nr0azMMrCEkGaM73VLxN4U~SOd2~FF~~dAKLVtxkZp4inn7cqT-kp-mdHzGAdAKZf~ig8-KZDmrnoufIJItl8KDjkLzthyYIo-7cLBAGe4IfQ__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>

              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/8df4/dd4b/49af750eb0fdd143fa31685694d8477b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8dvNl9iL3U1NojYtMIthh-llA-~87hpAhxaTMHXuBkaPWFD3GVHZ46RnBIcwk4F1iQTa7dt2hDiJTaFlQxf2mv6qxZvEO4BtCvxigcM3Bv2L5VKuEjEXvCDwAZSXUvR1qwd3Jy1sLNIoBk-kXhErnX~2pDQmZen0pGi5u7rsBKvmWBFdZETWAjCeT1JXp3aGnFT5CjMyB8OQkzY6wkHVvqDWErgoLr~QIthndGxrJkDCVY7ITELNalNJ3SH41cc~2HjCvsSWRxbamTIj6zb0tDrEtWv5CGVdk2BhmOmx7hBOAEDfeoL04X3gcEcD2FnBbxNA~mWkfjyNtlyzMsCfA__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-flex-mes-cours">
              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/5757/678a/32caef7603794e40f6a1e1b1a70c6eb4?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=opGwB2aRRa8~GudHVj-VJrPLzs18toO5DvA7eHcPAUWmGKpi9gH9sY8~OY0Yj~FZCwkcFm9ChcLwNPuUaNGMc9u5Ev1l6Ydvh-TH0aNkGoSZp0mfFdjIjAhc7-FDH83Un6DXJsjER-4tNEQFqmJeikwYZxp1Q6AP1VDHmAepAEOulFD7a~LkGhNEzOU5dopQMaC2HYuXACVHT6JtcO0eauV4bmQpCNnQ4PoR9Qmk26sC5qA4EgXiQDaUlf3dxL95nwnSX2Kxr3uOhG0y8GNSWLLiRXDJp0q3ZV8KdJXTBhKhez2XVE~RDiGfh~bp3y8RUmQeMK3rGOCCE3NuucFCgg__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>

              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/2b8d/39f0/7dd98b1e530839e333df119c9b39418c?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xgdx1Lx0eq24XhS0zHJ8O7Dw3Wu~zkELgKtl2nyEPp7yd0dcpC3wAhJf4XVUVam7FFAfU~Lmm6EdeG96~V5xx~sNX0GV4PeRDLFMJZCrIHBtYYTqj8Or2gf88jbqs4g7sydC1Sfs47pZZnwqGcEDzLzZNl0T1Blmjz8VmJETM8csc-nNzrNUh0~0iYvk~e59tfKTgGIQ~Z~xlWpSyQhVeHBe~GKBfkdlkmerV8xYcWFPurm3YJ7OFfEVBg36NEmpTRMTFUkFQAov6GhcHngA1VLNW8tIgInvA0cuUozlLb3sVWEgC9nIgJIF4yhQj85TeMY4NnauGYWXdxRfk6DYUQ__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>

              <div className="div-mes-cour">
                <img
                  src="https://s3-alpha-sig.figma.com/img/4b55/2d45/35addeb60a7b99733a1cf0c3356981f0?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IuCr85JDkWmRj0q8FlG2k3~~DnVPS566gJVHttk6L9773udpSSoyHWBJwHRLopHS8TnfnrWzMzHCIGJeqlQvcQfbOXEE8K4dIqzkdh6uFomb2ekK~ihS~WCXUzIpPGRX5eA6D8MaGTD8Hhv~v5rLodD3FC0IAyZO5bhzo8ihu9wDrBYT6Np4smyxr9XkWrII74v8knrFJlmPb6~WbcpPROrBqLP6CkJnAzizj3tH7dVAXW59FAFaL-PUijgfQZ-ba5~IEi0pwbOC7uQfNKWJYjDizdffcz~rb8QajQJHOobOUTkrbrZxFe1HvkTfheMIV698AJ55szjsLvKUbQ0Iug__"
                  alt=""
                  className="image-mescours"
                />
                <div className="div-cont-cour">
                  <h2>cours</h2>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="div-flex">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full mt-20 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-600">Mes cours</h1>
          <p className="text-gray-600">
            Explorez et apprenez quelque chose de nouveau
          </p>
        </div>

        {demandes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {demandes.map((cours) => (
              <div
                key={cours.id}
                className="w-full px-4 py-6 bg-white shadow-lg rounded-lg transition duration-300 transform hover:scale-105"
              >
                <Link to={`/suivrecours?idFormation=${cours.idFormation}`}>
                  <img
                    src={`data:image/jpeg;base64,${cours.image.toString(
                      "base64"
                    )}`}
                    alt="Card Image"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-xl text-gray-500 font-bold mb-2">
                      {cours.titre}
                    </h2>
                    <div className="flex items-center">
                      <div className="w-full h-4 bg-gray-300 rounded-lg mr-2">
                        <div
                          className="h-full bg-blue-500 rounded-lg"
                          style={{ width: `${cours.progres}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">{cours.progres}%</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MesCoursApprenant;
