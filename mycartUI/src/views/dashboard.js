import React from "react";

const dashboard = () => {
  return (
    <div className="p-4 w-screen h-auto flex flex-start ">
      <div className="w-40">Item 1</div>
      <div className="rounded w-full flex flex-col gap-2">
        <div className="bg-gray-100 h-14 flex items-center justify-between px-2">
          <div className="flex items-center relative">
            <input
              type="search"
              className="h-10 w-72 bg-gray-100 ps-2"
              placeholder="Search Task..."
            />
            <div className="pt-1 absolute right-2 text-2xl text-gray-400">
              <ion-icon name="search-outline"></ion-icon>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="border border-gray-400 rounded text-gray-500 gap-1 py-1 px-2  flex items-center">
              <span className="text-sm font-bold">PRIORITY </span>
              <div className="text-xl font-bold">
                <ion-icon name="filter-outline"></ion-icon>
              </div>
            </div>
            <div className="border border-gray-400 rounded text-gray-500 gap-1 py-1 px-2  flex items-center">
              <span className="text-sm font-bold">LABEL</span>
              <div className="text-xl font-bold">
                <ion-icon name="filter-outline"></ion-icon>
              </div>
            </div>
            <div className="rounded bg-gray-300 text-gray-500 gap-1 py-1 px-2  flex items-center">
              <span className="text-sm font-bold">CLEAR FILTERS</span>
              <div className="text-xl font-bold">
                <ion-icon name="funnel-outline"></ion-icon>
              </div>
            </div>
            <div className="pt-2 text-3xl">
              <ion-icon name="ellipsis-vertical"></ion-icon>
            </div>
          </div>
        </div>
        <div className="p-4 rounded bg-gray-100">
          <div className="flex flex-row start justify-evenly">
            <div className="flex flex-col items-center gap-2">
              <div
                className="text-white w-60 text-center text-lg h-12 flex items-center justify-between rounded px-2 py-1"
                style={{ backgroundColor: "#db6300" }}
              >
                <div>To-Do</div>
                <div className="bg-white w-8 h-8 rounded-full shadow-lg">
                  <span className="rounded-full font-bold text-sm text-black">
                    3
                  </span>
                </div>
              </div>
              <div className="font-bold text-gray-700 text-sm">+ Add Task</div>
              <div className="flex flex-row justify-between p-2 items-start w-full bg-white border-t-4 border-green-700">
                <div className="flex flex-col justify-start gap-2 font-bold text-sm pt-1">
                  <span>TASK 20</span>
                  <img src="images\user.png" width={30} />
                  <div className="text-gray-400 font-bold">Task-101</div>
                </div>
                <div className="flex flex-col justify-end pe-2 items-end gap-3">
                  <div className="text-gray-400 text-lg">
                    <ion-icon name="flag"></ion-icon>
                  </div>
                  <div className="text-gray-400 flex gap-2">
                    <div className="relative">
                      <div className="z-40">
                        <ion-icon name="document"></ion-icon>
                      </div>
                      <div className="absolute  right-0 h-5 w-5 flex items-center justify-center text-center rounded-full bg-blue-400">
                        <span
                          className="text-white"
                          style={{ fontSize: "10px" }}
                        >
                          01
                        </span>
                      </div>
                    </div>
                    <ion-icon name="document"></ion-icon>
                    <ion-icon name="folder-open"></ion-icon>
                  </div>
                  <div className="text-red-500 text-sm font-bold">
                    20-APR-2021
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="bg-gray-400 text-white w-60 text-center text-lg h-12 flex items-center justify-between rounded px-2 py-1"
                style={{ backgroundColor: "#656700" }}
              >
                <div>Yet to Start</div>
                <div className="bg-white w-8 h-8 rounded-full shadow-lg">
                  <span className="rounded-full font-bold text-sm text-black">
                    3
                  </span>
                </div>
              </div>
              <div className="opacity-0">.</div>
              <div className="flex flex-row justify-between p-2 items-start w-full bg-white border-t-4 border-green-700">
                <div className="flex flex-col justify-start gap-2 font-bold text-sm pt-1">
                  <span>TASK 20</span>
                  <img src="images\user.png" width={30} />
                  <div className="text-gray-400 font-bold">Task-101</div>
                </div>
                <div className="flex flex-col justify-end pe-2 items-end gap-3">
                  <div className="text-gray-400 text-lg">
                    <ion-icon name="flag"></ion-icon>
                  </div>
                  <div className="text-gray-400 flex gap-2">
                    <div className="relative">
                      <div className="z-40">
                        <ion-icon name="document"></ion-icon>
                      </div>
                      <div className="absolute  right-0 h-5 w-5 flex items-center justify-center text-center rounded-full bg-blue-400">
                        <span
                          className="text-white"
                          style={{ fontSize: "10px" }}
                        >
                          01
                        </span>
                      </div>
                    </div>
                    <ion-icon name="document"></ion-icon>
                    <ion-icon name="folder-open"></ion-icon>
                  </div>
                  <div className="text-red-500 text-sm font-bold">
                    20-APR-2021
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="bg-gray-400 text-white w-60 text-center text-lg h-12 flex items-center justify-between rounded px-2 py-1"
                style={{ backgroundColor: "#003174" }}
              >
                <div>In-Progress</div>
                <div className="bg-white w-8 h-8 rounded-full shadow-lg">
                  <span className="rounded-full font-bold text-sm text-black">
                    2
                  </span>
                </div>
              </div>
              <div className="opacity-0">.</div>
              <div className="w-full bg-white border-t-2 border-green-700">
                <span>test</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="bg-gray-400 text-white w-60 text-center text-lg h-12 flex items-center justify-between rounded px-2 py-1"
                style={{ backgroundColor: "#a8005a" }}
              >
                <div>On-Hold</div>
                <div className="bg-white w-8 h-8 rounded-full shadow-lg">
                  <span className="rounded-full font-bold text-sm text-black">
                    2
                  </span>
                </div>
              </div>
              <div className="opacity-0">.</div>
              <div className="w-full bg-white border-t-2 border-green-700">
                <span>test</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="bg-gray-400 text-white w-60 text-center text-lg h-12 flex items-center justify-between rounded px-2 py-1"
                style={{ backgroundColor: "#004626" }}
              >
                <div>Completed</div>
                <div className="bg-white w-8 h-8 rounded-full shadow-lg">
                  <span className="rounded-full font-bold text-sm text-black">
                    2
                  </span>
                </div>
              </div>
              <div className="opacity-0">.</div>
              <div className="w-full bg-white border-t-2 border-green-700">
                <span>test</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
