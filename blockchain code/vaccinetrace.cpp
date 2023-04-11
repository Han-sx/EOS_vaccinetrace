// #include <eosio/eosio.hpp>
#include <eosiolib/time.hpp>
// #include <eosiolib/system.h>
using namespace eosio;



class [[eosio::contract("vaccinetrace")]] vaccinetrace : public eosio::contract {
    public:
        vaccinetrace(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}
        //继承父合同，code是将合同部署到的区块链上的帐户

//==============================================注册信息函数定义===============================================
        [[eosio::action]]
        void adduser(name scope, name username, std::string public_key, std::string unit, std::string supervisor,
        std::string phone, std::string email, std::string authority){
            //添加注册信息函数
            require_auth(name("bob"));  //添加信息权限
            registers_index registers(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
            auto iterator = registers.find(username.value); //查询迭代器
            if(iterator == registers.end()){    //检测是否存在相同账户名
                //若不存在此用户，则加入信息
                registers.emplace(name("bob"), [&](auto& row){    //添加信息(第一位参数为支付存储空间账户)
                    row.username = username;
                    row.public_key = public_key;
                    row.unit = unit;
                    row.supervisor = supervisor;
                    row.phone = phone;
                    row.email = email;
                    row.authority = authority;
                });
                print("成功注册单位信息！");
            }
            else{
                //若存在相同账户名
                print("此账户名已存在，不可重复添加！");
            }
        }
    //————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void updateuser(name scope, name username, std::string public_key, std::string unit, std::string supervisor,
        std::string phone, std::string email, std::string authority){
            //修改注册信息函数
            require_auth(name("bob"));  //修改信息权限
            registers_index registers(get_self(), scope.value); //实例化
            auto iterator = registers.get(username.value); //查询迭代器
            if(iterator.username != username){    //检测是否存在相同账户
                //若不存在此用户
                print("不存在此用户，请核实后重试！");
            }
            else{
                //若存在此用户，记录并修改

                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                registersr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("bob"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.username = iterator.username;
                    row.public_key = iterator.public_key;
                    row.unit = iterator.unit;
                    row.supervisor = iterator.supervisor;
                    row.phone = iterator.phone;
                    row.email = iterator.email;
                    row.authority = iterator.authority;
                    row.operating = "修改数据";
                    row.time = now_time;
                });

                auto iterator2 = registers.find(username.value); //查询迭代器
                registers.modify(iterator2, name("bob"), [&](auto& row){   //修改信息
                    row.username = username;
                    row.public_key = public_key;
                    row.unit = unit;
                    row.supervisor = supervisor;
                    row.phone = phone;
                    row.email = email;
                    row.authority = authority;
                });
                print("信息更新成功，该操作将被记录！");
            }
        }
    //————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void eraseuser(name scope, name username){
            //删除注册信息函数
            require_auth(name("bob"));  //删除信息权限
            registers_index registers(get_self(), scope.value); //实例化
            auto iterator = registers.find(username.value); //查询迭代器
            if(iterator == registers.end()){    //检测是否存在相同账户
                //若不存在此账户
                print("不存在此账户，请核实后重试！");
            }
            else{
                //若存在此账户，记录并删除

                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                auto iterator2 = registers.get(username.value); //获取迭代器
                registersr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("bob"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.username = iterator2.username;
                    row.public_key = iterator2.public_key;
                    row.unit = iterator2.unit;
                    row.supervisor = iterator2.supervisor;
                    row.phone = iterator2.phone;
                    row.email = iterator2.email;
                    row.authority = iterator2.authority;
                    row.operating = "删除数据";
                    row.time = now_time;
                });
                registers.erase(iterator);
                print("此账户信息已删除，该操作将被记录！");
            }
        }

//======================================1、生产信息函数定义（功能名1)===============================================
        [[eosio::action]]
        void add1(name scope, uint64_t ID, std::string vaccine_name, std::string manufacturer, std::string produce_date,
        uint64_t shelf_life, std::string authorization){    
            //添加生产信息函数
            require_auth(name("manufacturer"));  //添加信息权限
            product_index products(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
            auto iterator = products.find(ID); //查询迭代器
            if(iterator == products.end()){    //检测是否存在相同ID
                //若不存在此ID，则加入信息
                products.emplace(name("manufacturer"), [&](auto& row){    //添加信息(第一位参数为支付存储空间账户)
                    row.vaccine_ID = ID;
                    row.vaccine_name = vaccine_name;
                    row.manufacturer = manufacturer;
                    row.produce_date = produce_date;
                    row.shelf_life = shelf_life;
                    row.authorization = authorization;
                });
                print("成功添加生产信息！");
            }
            else{
                //若存在相同ID
                print("此ID已存在，不可重复添加！若需修改可使用“update1”方法");
            }
        }
    //————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void update1(name scope, uint64_t ID, std::string vaccine_name, std::string manufacturer, std::string produce_date,
        uint64_t shelf_life, std::string authorization){
            //修改生产信息函数
            require_auth(name("manufacturer"));  //修改信息权限
            product_index products(get_self(), scope.value); //实例化
            auto iterator = products.get(ID); //查询迭代器
            if(iterator.vaccine_ID != ID){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID，记录并修改

                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                productr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("manufacturer"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.vaccine_ID = iterator.vaccine_ID;
                    row.vaccine_name = iterator.vaccine_name;
                    row.manufacturer = iterator.manufacturer;
                    row.produce_date = iterator.produce_date;
                    row.shelf_life = iterator.shelf_life;
                    row.authorization = iterator.authorization;
                    row.operating = "修改数据";
                    row.time = now_time;
                });

                auto iterator2 = products.find(ID); //查询迭代器
                products.modify(iterator2, name("manufacturer"), [&](auto& row){   //修改信息
                    row.vaccine_ID = ID;
                    row.vaccine_name = vaccine_name;
                    row.manufacturer = manufacturer;
                    row.produce_date = produce_date;
                    row.shelf_life = shelf_life;
                    row.authorization = authorization;
                });
                print("信息更新成功，该操作将被记录！");
            }
        }
    //——————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void erase1(name scope, uint64_t ID){
            //删除生产信息函数
            require_auth(name("manufacturer"));  //删除信息权限
            product_index products(get_self(), scope.value); //实例化
            auto iterator = products.find(ID); //查询迭代器
            if(iterator == products.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID，记录并删除

                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                auto iterator2 = products.get(ID); //获取迭代器
                productr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("manufacturer"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.vaccine_ID = iterator2.vaccine_ID;
                    row.vaccine_name = iterator2.vaccine_name;
                    row.manufacturer = iterator2.manufacturer;
                    row.produce_date = iterator2.produce_date;
                    row.shelf_life = iterator2.shelf_life;
                    row.authorization = iterator2.authorization;
                    row.operating = "删除数据";
                    row.time = now_time;
                });
                products.erase(iterator);
                print("此ID信息已删除，该操作将被记录！");
            }
        }
//======================================2、运输信息函数定义（功能名2)===============================================
        [[eosio::action]]
        void add2(name scope, uint64_t ID, std::string transport_number, std::string transport_company, 
        std::string from_location, std::string to_location, std::string ship_date, std::string arrival_date){    
            //添加运输信息函数
            require_auth(name("transporter"));  //添加信息权限
            product_index products(get_self(), scope.value); //实例化
            auto iterator_1 = products.find(ID); //查询源头ID
            if(iterator_1 == products.end()){    //检测是否存在ID
                //若不存在此ID
                print("找不到ID源头，请核实后重试！");
            }
            else{
                //若存在此ID源头，则添加
                transport_index transport(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
                auto iterator = transport.find(ID); //查询迭代器
                if(iterator == transport.end()){    //检测是否存在相同ID
                    //若不存在此ID，则加入信息
                    transport.emplace(name("transporter"), [&](auto& row){    //添加信息(第一位参数为支付存储空间账户)
                        row.vaccine_ID = ID;
                        row.transport_number = transport_number;
                        row.transport_company = transport_company;
                        row.from_location = from_location;
                        row.to_location = to_location;
                        row.ship_date = ship_date;
                        row.arrival_date = arrival_date;
                    });
                    print("成功添加运输信息！");
                }
                else{
                    //若存在相同ID
                    print("此ID已存在，不可重复添加！若需修改可使用“update2”方法");
                }
            }
        }
    //——————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void update2(name scope, uint64_t ID, std::string transport_number, std::string transport_company, 
        std::string from_location, std::string to_location, std::string ship_date, std::string arrival_date){    
            //修改运输信息函数
            require_auth(name("transporter"));  //修改信息权限
            transport_index transport(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
            auto iterator = transport.get(ID); //查询迭代器
            if(iterator.vaccine_ID != ID){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID，记录并修改
                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                transportr_index modify_index(get_self(), scope.value);     //实例化
                modify_index.emplace(name("transporter"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.vaccine_ID = iterator.vaccine_ID;
                    row.transport_number = iterator.transport_number;
                    row.transport_company = iterator.transport_company;
                    row.from_location = iterator.from_location;
                    row.to_location = iterator.to_location;
                    row.ship_date = iterator.ship_date;
                    row.arrival_date = iterator.arrival_date;
                    row.operating = "修改数据";
                    row.time = now_time;
                });

                auto iterator2 = transport.find(ID); //查询迭代器
                transport.modify(iterator2, name("transporter"), [&](auto& row){   //修改信息
                    row.vaccine_ID = ID;
                    row.transport_number = transport_number;
                    row.transport_company = transport_company;
                    row.from_location = from_location;
                    row.to_location = to_location;
                    row.ship_date = ship_date;
                    row.arrival_date = arrival_date;
                });    
                print("信息更新成功，该操作将被记录！");           
            }
        }
    //——————————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void erase2(name scope, uint64_t ID){
            //删除运输信息函数
            require_auth(name("transporter"));  //删除信息权限
            transport_index transport(get_self(), scope.value); //实例化
            auto iterator = transport.find(ID); //查询迭代器
            if(iterator == transport.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                auto iterator2 = transport.get(ID); //获取迭代器
                transportr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("transporter"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.vaccine_ID = iterator2.vaccine_ID;
                    row.transport_number = iterator2.transport_number;
                    row.transport_company = iterator2.transport_company;
                    row.from_location = iterator2.from_location;
                    row.to_location = iterator2.to_location;
                    row.ship_date = iterator2.ship_date;
                    row.arrival_date = iterator2.arrival_date;
                    row.operating = "删除数据";
                    row.time = now_time;
                });

                transport.erase(iterator);
                print("此ID信息已删除，该操作将被记录！");
            }
        }
//======================================3、接种信息函数定义（功能名3)===============================================
        [[eosio::action]]
        void add3(name scope, uint64_t ID, std::string inoculation_name, std::string inoculation_number, 
        std::string inoculation_location, std::string inoculation_date, std::string authorization){    
            //添加接种信息函数
            require_auth(name("inoculation"));  //添加信息权限
            product_index products(get_self(), scope.value); //实例化
            auto iterator_1 = products.find(ID); //查询源头ID
            if(iterator_1 == products.end()){    //检测是否存在ID
                //若不存在此ID
                print("找不到ID源头，请核实后重试！");
            }
            else{
                //若存在此ID源头，则寻找中转信息
                transport_index transport(get_self(), scope.value); //实例化中转表
                auto iterator_2 = transport.find(ID); //查询迭代器
                if(iterator_2 == transport.end()){
                    //若不存在此中转ID
                    print("找不到此ID的中转信息，请核实后重试！");
                }
                else
                {
                    //存在此中转信息
                    inoculation_index inoculation(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
                    auto iterator = inoculation.find(ID); //查询迭代器
                    if(iterator == inoculation.end()){    //检测是否存在相同ID
                        //若不存在此ID，则加入信息
                        inoculation.emplace(name("inoculation"), [&](auto& row){    //添加信息(第一位参数为支付存储空间账户)
                            row.vaccine_ID = ID;
                            row.inoculation_name = inoculation_name;
                            row.inoculation_number = inoculation_number;
                            row.inoculation_location = inoculation_location;
                            row.inoculation_date = inoculation_date;
                            row.authorization = authorization;
                        });
                        print("成功添加接种信息！");
                    }
                    else{
                        //若存在相同ID
                        print("此ID已存在，不可重复添加！若需修改可使用“update3”方法");
                    }
                }
            }         
        }
    //———————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void update3(name scope, uint64_t ID, std::string inoculation_name, std::string inoculation_number, 
        std::string inoculation_location, std::string inoculation_date, std::string authorization){    
            //修改接种信息函数
            require_auth(name("inoculation"));  //修改信息权限
            inoculation_index inoculation(get_self(), scope.value); //实例化(code是发布合约的account,scope可以理解为同一数据表的不同部分)
            auto iterator = inoculation.get(ID);    //查询迭代器
            if(iterator.vaccine_ID != ID){          //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                inoculationr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("inoculation"), [&](auto& row){               //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();          //主键自增
                    row.vaccine_ID = iterator.vaccine_ID;
                    row.inoculation_name = iterator.inoculation_name;
                    row.inoculation_number = iterator.inoculation_number;
                    row.inoculation_location = iterator.inoculation_location;
                    row.inoculation_date = iterator.inoculation_date;
                    row.authorization = iterator.authorization;
                    row.operating = "修改数据";
                    row.time = now_time;
                });

                auto iterator2 = inoculation.find(ID); //查询迭代器
                inoculation.modify(iterator2, name("inoculation"), [&](auto& row){   //修改信息
                    row.vaccine_ID = ID;
                    row.inoculation_name = inoculation_name;
                    row.inoculation_number = inoculation_number;
                    row.inoculation_location = inoculation_location;
                    row.inoculation_date = inoculation_date;
                    row.authorization = authorization;
                });    
                print("信息更新成功，该操作将被记录！");           
            }
        }
    //———————————————————————————————————————————————————————————————————————————————————————————————————————
        [[eosio::action]]
        void erase3(name scope, uint64_t ID){
            //删除接种信息函数
            require_auth(name("inoculation"));  //删除信息权限
            inoculation_index inoculation(get_self(), scope.value); //实例化
            auto iterator = inoculation.find(ID); //查询迭代器
            if(iterator == inoculation.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                auto a = time_point_sec(now()); //获取时间戳
                uint32_t now_time = a.utc_seconds;
                print(a.utc_seconds);

                auto iterator2 = inoculation.get(ID); //获取迭代器
                inoculationr_index modify_index(get_self(), scope.value);       //实例化
                modify_index.emplace(name("inoculation"), [&](auto& row){           //添加信息(第一位参数为支付存储空间账户)
                    row.number = modify_index.available_primary_key();      //主键自增
                    row.vaccine_ID = iterator2.vaccine_ID;
                    row.inoculation_name = iterator2.inoculation_name;
                    row.inoculation_number = iterator2.inoculation_number;
                    row.inoculation_location = iterator2.inoculation_location;
                    row.inoculation_date = iterator2.inoculation_date;
                    row.authorization = iterator2.authorization;
                    row.operating = "删除数据";
                    row.time = now_time;
                });
                inoculation.erase(iterator);
                print("此ID信息已删除，该操作将被记录！");
            }
        }

//========================================信息记录删除函数（调试用）===============================================
        [[eosio::action]]
        void erasepr(uint64_t number, name scope){
            //删除生产信息记录
            require_auth(name("bob"));  //删除信息权限
            productr_index modify_index(get_self(), scope.value); //实例化
            auto iterator = modify_index.find(number); //查询迭代器
            if(iterator == modify_index.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                modify_index.erase(iterator);
                print("此生产信息记录已删除");
            }
        }

        [[eosio::action]]
        void erasetr(uint64_t number, name scope){
            //删除运输信息记录
            require_auth(name("bob"));  //删除信息权限
            transportr_index modify_index(get_self(), scope.value); //实例化
            auto iterator = modify_index.find(number); //查询迭代器
            if(iterator == modify_index.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                modify_index.erase(iterator);
                print("此运输信息记录已删除");
            }
        }

        [[eosio::action]]
        void eraseir(uint64_t number, name scope){
            //删除接种信息记录
            require_auth(name("bob"));  //删除信息权限
            inoculationr_index modify_index(get_self(), scope.value); //实例化
            auto iterator = modify_index.find(number); //查询迭代器
            if(iterator == modify_index.end()){    //检测是否存在相同ID
                //若不存在此ID
                print("不存在此ID，请核实后重试！");
            }
            else{
                //若存在此ID
                modify_index.erase(iterator);
                print("此运输信息记录已删除");
            }
        }

//****************************************以下部分主要为数据结构表**************************************************
    private:
    //——————————————————————————————————————1、生产信息数据结构表——————————————————————————————————————————————————
        struct [[eosio::table]] product{
            //疫苗生产信息数据结构表
            uint64_t vaccine_ID;        //产品ID（第一位不为0）
            std::string vaccine_name;   //疫苗名称
            std::string manufacturer;   //生产企业
            std::string produce_date;   //生产日期
            uint64_t shelf_life;        //保质期(天)
            std::string authorization;  //授权部门

            uint64_t primary_key() const {return vaccine_ID;}    //设主键
        };
        typedef eosio::multi_index<"products"_n, product> product_index; //定义实例表product_index


        struct [[eosio::table]] productr{
            //生产信息修改记录表
            uint64_t number;            //序号
            uint64_t vaccine_ID;        //产品ID（第一位不为0）
            std::string vaccine_name;   //疫苗名称
            std::string manufacturer;   //生产企业
            std::string produce_date;   //生产日期
            uint64_t shelf_life;        //保质期(天)
            std::string authorization;  //授权部门
            std::string operating;      //操作类型
            uint32_t time;              //修改日期
            uint64_t primary_key() const {return number;}    //设主键
        };
        typedef eosio::multi_index<"productsr"_n, productr> productr_index; //定义实例表productr_index
        

    //——————————————————————————————————————2、运输信息数据结构表—————————————————————————————————————————————————
        struct [[eosio::table]] transport{
            //疫苗运输信息数据结构表
            uint64_t vaccine_ID;            //产品ID（第一位不为0）
            std::string transport_number;   //物流编号
            std::string transport_company;  //运输公司
            std::string from_location;      //起发点
            std::string to_location;        //目的地
            std::string ship_date;          //发货日期
            std::string arrival_date;       //到达日期

            uint64_t primary_key() const {return vaccine_ID;}    //设主键
        };
        typedef eosio::multi_index<"transport"_n, transport> transport_index; //定义实例表transport_index

        struct [[eosio::table]] transportr{
            //疫苗运输信息修改记录表
            uint64_t number;                //序号
            uint64_t vaccine_ID;            //产品ID（第一位不为0）
            std::string transport_number;   //物流编号
            std::string transport_company;  //运输公司
            std::string from_location;      //起发点
            std::string to_location;        //目的地
            std::string ship_date;          //发货日期
            std::string arrival_date;       //到达日期
            std::string operating;          //操作类型
            uint32_t time;                  //修改日期

            uint64_t primary_key() const {return number;}    //设主键
        };
        typedef eosio::multi_index<"transportr"_n, transportr> transportr_index; //定义实例表transportr_index

    //——————————————————————————————————————3、接种信息数据结构表—————————————————————————————————————————————————
        struct [[eosio::table]] inoculation{
            //疫苗接种信息数据结构表
            uint64_t vaccine_ID;                //产品ID（第一位不为0）
            std::string inoculation_name;       //接种人姓名
            std::string inoculation_number;     //接种人编号
            std::string inoculation_location;   //接种地点
            std::string inoculation_date;       //接种日期
            std::string authorization;          //授权单位

            uint64_t primary_key() const {return vaccine_ID;}    //设主键
        };
        typedef eosio::multi_index<"inoculation"_n, inoculation> inoculation_index; //定义实例表inoculation_index

        struct [[eosio::table]] inoculationr{
            //疫苗接种信息修改记录表
            uint64_t number;                    //序号
            uint64_t vaccine_ID;                //产品ID（第一位不为0）
            std::string inoculation_name;       //接种人姓名
            std::string inoculation_number;     //接种人编号
            std::string inoculation_location;   //接种地点
            std::string inoculation_date;       //接种日期
            std::string authorization;          //授权单位
            std::string operating;              //操作类型
            uint32_t time;                      //修改日期

            uint64_t primary_key() const {return number;}    //设主键
        };
        typedef eosio::multi_index<"inoculationr"_n, inoculationr> inoculationr_index; //定义实例表inoculationr_index

    //——————————————————————————————————————4、注册单位数据结构表—————————————————————————————————————————————————
        struct [[eosio::table]] registers{
            //注册单位信息数据结构表
            name username;                      //账户名
            std::string public_key;             //公钥
            std::string unit;                   //单位
            std::string supervisor;             //负责人
            std::string phone;                  //电话号码
            std::string email;                  //邮箱
            std::string authority;              //权限

            uint64_t primary_key() const {return username.value;}    //设主键
        };
        typedef eosio::multi_index<"registers"_n, registers> registers_index; //定义实例表registers_index

        struct [[eosio::table]] registersr{
            //注册单位信息修改记录表
            uint64_t number;            //序号
            name username;              //账户名
            std::string public_key;     //公钥
            std::string unit;           //单位
            std::string supervisor;     //负责人
            std::string phone;          //电话号码
            std::string email;          //邮箱
            std::string authority;      //权限
            std::string operating;      //操作类型
            uint32_t time;              //修改日期

            uint64_t primary_key() const {return number;}    //设主键
        };
        typedef eosio::multi_index<"registersr"_n, registersr> registersr_index; //定义实例表registersr_index
};