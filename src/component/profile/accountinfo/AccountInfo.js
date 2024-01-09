import React from "react";



const AccountInfo = () => {




  return (
    
  
                    <div className="card h-full">
                      <div className="card-body p-6">
                        <ul className="list space-y-8">
                        <div style={{flexDirection:'row',display:'flex'}}>
                          <li className="flex space-x-3 rtl:space-x-reverse">
                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                              <iconify-icon icon="heroicons:envelope"></iconify-icon>
                            </div>
                            <div className="flex-1">
                              <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                NAME ON ACCOUNT
                              </div>
                              <div className="text-base text-slate-600 dark:text-slate-50">
                                Ram Gupta
                              </div>
                            </div>
                          </li>
                          {/* <!-- end single list --> */}
                          <li className="flex space-x-3 rtl:space-x-reverse" style={{marginLeft:'60px'}}>
                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                              <iconify-icon icon="heroicons:phone-arrow-up-right"></iconify-icon>
                            </div>
                            <div className="flex-1">
                              <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                ACCOUNT NUMBER
                              </div>
                              <div className="text-base text-slate-600 dark:text-slate-50">
                              954047863212
                              </div>
                            </div>
                           
                          </li>
                          </div>
                          {/* <!-- end single list --> */}
                          <div style={{flexDirection:'row',display:'flex'}}>
                          <li className="flex space-x-3 rtl:space-x-reverse">
                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                              <iconify-icon icon="heroicons:map"></iconify-icon>
                            </div>
                            <div className="flex-1">
                              <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                BRANCH
                              </div>
                              <div className="text-base text-slate-600 dark:text-slate-50">
                            Shikohabad
                              </div>
                            </div>
                          </li>
                          {/* <!-- end single list --> */}
                          <li className="flex space-x-3 rtl:space-x-reverse" style={{marginLeft:'90px'}}>
                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                              <iconify-icon icon="heroicons:map"></iconify-icon>
                            </div>
                            <div className="flex-1">
                              <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                IFSCCODE
                              </div>
                              <div className="text-base text-slate-600 dark:text-slate-50">
                            BKID70002
                              </div>
                            </div>
                          </li>
                          </div>
                        </ul>
                      </div>
                    </div>
               
    
  );
};

export default AccountInfo;
